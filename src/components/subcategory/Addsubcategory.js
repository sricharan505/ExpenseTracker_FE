import { useState } from "react";
import { useSelector } from "react-redux";
import Error from "../pages/error";

const Addsubcategory = ({type,category,close}) => {

    const { authtoken } = useSelector( state => state.user );

    const [newsubcategory,setNewsubcategory] = useState("");
    const [subcategoryerror,setsubcategoryerror] = useState("");

    const handlesubmit = async (e) => {
        e.preventDefault();
        setsubcategoryerror("");

        if(newsubcategory.trim() === "")
        {
            setsubcategoryerror("Subcategory cannot be empty");
            return 
        }

        const addsubcategoryquery = {
            query: `
                    
                    mutation
                    {
                        addSubcategory(
                            type:"${type}"
                            category:"${category}"
                            subcategory:"${newsubcategory}"
                        )
                    }
                
            `,
        };

        let res;
        res = await fetch(process.env.REACT_APP_API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + authtoken,
        },
        body: JSON.stringify(addsubcategoryquery),
        });
        res = await res.json();

        if (res.errors && res.errors[0].message === "Subcategory already present") 
        {
            setsubcategoryerror("This sub-category already exists.");
            return;
        } 
        else if ( res.errors && res.errors[0].message === "Max no of subcategories allowed is 5") 
        {
            setsubcategoryerror("You have created maximum number of sub-categories");
            return;
        }
        else if( res.errors && res.errors[0].message === "Entries without subcategory found" )
        {
            setsubcategoryerror("Category already contains entries without subcategory. To create subcategory delete all the entries.")
        }

        if (res.data.addSubcategory) 
        {
            close();
        } 
        else 
        {
        return <Error />;
        }
    }

    return(
    <div className="bg-purple-500 text-xl p-8 rounded-2xl">
        <form onSubmit={handlesubmit}>
            <div className="p-1">
                <label>Type : <span className="font-bold">{type}</span></label>
            </div>
            <div className="p-1">
                <label>Category : <span className="font-bold">{category}</span></label>
            </div>
            <div className="p-1">
                <label>Subcategory : </label>
                <input className="border rounded-lg p-1" value={newsubcategory} onChange={ e => setNewsubcategory(e.target.value)}></input>
                <br></br>
                <span className="text-lg pl-16 text-red-600">{subcategoryerror}</span>
            </div>
            <div  className="flex justify-center p-1 m-2">
                <button  type="submit" className="m-2 p-2 border rounded bg-green-500" >Submit</button>
                <button type="button" className="m-2 p-2 border rounded bg-red-500" onClick={close}>Close</button>
            </div>
        </form>
    </div>
    )
}

export default Addsubcategory;