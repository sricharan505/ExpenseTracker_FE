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

        if(category === "")
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
        <div className="flex flex-col justify-center">
            <div>
                <button className="m-2 p-2 border" onClick={()=>close(false)}>
                    Close
                </button>
            </div>
            <div>
                <form onSubmit={handleSubmit}>
                    <label>Type : {type}</label>
                    <br></br>
                    <label>Category </label>
                    <input value={edittedcategory} onChange={(e)=>setEdittedcategory(e.target.value)}></input>
                    <br></br>
                    <span>{categoryerror}</span>

                    <button type="submit" className="m-2 p-2 border">Submit</button>
                </form>
            </div>
        </div>
    );
}

export default EditCategory;