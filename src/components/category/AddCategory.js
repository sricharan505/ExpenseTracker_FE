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
    newsubcategories.push("");
    setNewsubcategories([...newsubcategories]);
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
    <div className="flex flex-col justify-center">
      <button className="border p-2 m-2" onClick={() => close(false)}>
        close
      </button>
      <form onSubmit={handleSubmit}>
        <label>Type : </label>
        <label>{type}</label>
        <br></br>
        <label>Category : </label>
        <input
          value={newcategory}
          onChange={(e) => {
            setCategoryerror("");
            setNewcategory(e.target.value);
          }}
        ></input>
        <br></br>
        {categoryerror !== "" && <span>{categoryerror}</span>}
        <br></br>
        <div className="subcategories">
          <label>
            Sub-Categories :{" "}
            <button
              type="button"
              className="border px-1 m-1"
              onClick={handleaddsubcategory}
            >
              +
            </button>
          </label>
          <div>
            {newsubcategories.map((s, index) => {
              //console.log(index);
              return (
                <div key={index}>
                  <input
                    type="text"
                    value={newsubcategories[index]}
                    className="m-1"
                    onChange={(e) => handletypesub(e, index)}
                  ></input>
                  <button
                    type="button"
                    onClick={() => handledeletesubcategory(index)}
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
              );
            })}
            {subcategoryerror !== "" && <span>{subcategoryerror}</span>}
          </div>
        </div>
        <button type="submit" className="border p-2 m-2">
          Add
        </button>
      </form>
    </div>
  );
};

export default Addcategory;
