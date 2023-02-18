import { useState } from "react";
import { useSelector } from "react-redux";
import Error from "../pages/error";

const EditCategory = ({close,type,category}) => {
    //console.log(close,type,category);

    const {authtoken} = useSelector(state => state.user);

    const [edittedcategory, setEdittedcategory] = useState(category)
    const [categoryerror,setCategoryerror] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        //console.log(category,edittedcategory);

        if(category === edittedcategory)
        {
            close();
            return;
        }

        if(category === "" || edittedcategory === "")
        {
            setCategoryerror("Category cannot be empty");
            return;
        }

        const editcategoryquery = {
            query: `
                mutation{
                    editCategory(
                        type:"${type}"
                        oldcategory:"${category}"
                        newcategory:"${edittedcategory}"
                    )
                }
            `
        }

        let res;

        res = await fetch(process.env.REACT_APP_API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + authtoken,
            },
            body: JSON.stringify(editcategoryquery),
        })

        res = await res.json();

        if(res.errors && res.errors[0].message === "newcategory already present")
        {
            setCategoryerror("Category cannot be empty");
            return;
        }

        if(res.data.editCategory)
        {
            close();
            return;
        } 
        else 
        {
            return <Error />;
        }
        
    }

    return(
        <div className="bg-purple-500 text-xl p-8 rounded-2xl">
            <div>
                <form onSubmit={handleSubmit}>

                    <div>
                    <label>Type : <span className="font-bold">{type}</span></label>
                    </div>

                    <br></br>

                    <div>
                        <label>Category </label>
                        <input className="border rounded-lg p-1" value={edittedcategory} onChange={(e)=>setEdittedcategory(e.target.value)}></input>
                        <br></br>
                        <span className="text-lg pl-2 text-red-600">{categoryerror}</span>
                    </div>
                    

                    <div className="flex justify-center p-1 m-2">
                        <button type="submit" className="m-2 p-2 border rounded bg-green-500">Submit</button>
                        <button className="m-2 p-2 border rounded bg-red-500" onClick={()=>close(false)}>
                            Close
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default EditCategory;