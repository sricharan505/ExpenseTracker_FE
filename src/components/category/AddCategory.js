import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Error from "../pages/error";
import { loadcategories } from "../../features/User/userSlice";

const Addcategory = ({ close, type }) => {

  const { authtoken } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [newcategory, setNewcategory] = useState("");
  const [newsubcategories, setNewsubcategories] = useState([]);
  const [categoryerror, setCategoryerror] = useState("");
  const [subcategoryerror, setSubcategoryerror] = useState("");

  const getcategories = async () => {
    const getcategoriesquery = () => {
      return {
        query: `
                        {
                            getCategories(type:"${type}")
                            {
                                category
                                subcategories
                            }
                        }
                        `,
      };
    };

    let res;
    res = await fetch(process.env.REACT_APP_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + authtoken,
      },
      body: JSON.stringify(getcategoriesquery()),
    });
    res = await res.json();
    dispatch(
      loadcategories({ type: type, categories: res.data.getCategories })
    );
  };

  const handletypesub = (e, index) => {
    //console.log(index,newsubcategories);
    newsubcategories[index] = e.target.value;
    setNewsubcategories([...newsubcategories]);
  };

  const handleaddsubcategory = () => {
    //console.log(newsubcategories);
    if(newsubcategories.length < 5)
    {
      newsubcategories.push("");
      setNewsubcategories([...newsubcategories]);
    }
    else
    {
      setSubcategoryerror("Max no of subcategories allowed is 5");
    }
  };

  const handledeletesubcategory = (index) => {
    //console.log(index, newsubcategories.length);
    newsubcategories.splice(index, 1);
    setNewsubcategories([...newsubcategories]);
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    setCategoryerror("");
    setSubcategoryerror("");
    const addcategoryquery = {
      query: `
                
                    mutation
                    {
                        addCategory(
                            type:"${type}"
                            category:
                            {
                                categoryname: "${newcategory}"  
                                ${
                                  newsubcategories.length > 0
                                    ? `subcategories:[${newsubcategories.map(
                                        (s) => `"${s}"`
                                      )}]`
                                    : ``
                                }
                            }
                        )
                    }
                
            `,
    };

    if (newcategory === "") {
      setCategoryerror("Category cannot be empty");
      return;
    }

    const nodup = new Set(newsubcategories);

    if (
      newsubcategories.length !== 0 &&
      nodup.size !== newsubcategories.length
    ) {
      setSubcategoryerror("Subcategories cannot have duplicates.");
      return;
    }

    if (newsubcategories.length > 5) {
      setSubcategoryerror("Max no of subcategories allowed is 5");
      return;
    }

    let res;
    res = await fetch(process.env.REACT_APP_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + authtoken,
      },
      body: JSON.stringify(addcategoryquery),
    });
    res = await res.json();

    if (res.errors && res.errors[0].message === "Category already exists") {
      setCategoryerror("This category already exists.");
      return;
    } 
    else if ( res.errors && res.errors[0].message === "Max no of categories present") 
    {
      setCategoryerror("You have created maximum number of categories");
      return;
    }

    if (res.data.addCategory) 
    {
      await getcategories();
      close(false);
    } 
    else 
    {
      return <Error />;
    }
  };

  return (
    <div className="bg-purple-500 text-xl p-8 rounded-2xl">
      
      <form onSubmit={handleSubmit}>

        <div className="p-2">
          <label>Type : </label>
          <label className="font-bold">{type}</label>
        </div>
        
        <div className="p-2">
          <label for="category">Category : </label>
          <input
            name = "category"
            className="border rounded-lg p-1"
            value={newcategory}
            onChange={(e) => {
              setCategoryerror("");
              setNewcategory(e.target.value);
            }}
          ></input>
          <br></br>
          {categoryerror !== "" && <span className="text-lg pl-2 text-red-600">{categoryerror}</span>}
        </div>

        <div className="subcategories p-2">
          <label>
            Sub-Categories :{" "}
            <button
              type="button"
              className="border px-2 p-1 rounded-xl m-1"
              onClick={handleaddsubcategory}
            >
              +
            </button>
          </label>
          <div className="p-1">
            {newsubcategories.map((s, index) => {
              //console.log(index);
              return (
                <div key={index}>
                  <div className="flex content-center">
                    <input
                      type="text"
                      value={newsubcategories[index]}
                      className="m-1 border rounded-lg p-1"
                      onChange={(e) => handletypesub(e, index)}
                    ></input>
                    <button
                      type="button"
                      onClick={() => handledeletesubcategory(index)}
                      className="ml-1"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-5 h-5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              );
            })}
            {subcategoryerror !== "" && <span className="text-lg pl-2 text-red-600">{subcategoryerror}</span>}
          </div>
        </div>
        <div className="w-full flex justify-center">
          <button type="submit" className="border p-2 px-4 rounded m-2 bg-green-500">
            Add
          </button>
          <button className="border p-2 px-4 rounded m-2 bg-red-500" onClick={() => close(false)}>
            Close
          </button>
        </div>
      </form>
    </div>
  );
};

export default Addcategory;
