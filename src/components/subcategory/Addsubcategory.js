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
    <div>
        <button type="button" className="m-2 p-2 border" onClick={close}>Close</button>
        <form onSubmit={handlesubmit}>
            <label>Type : {type}</label>
            <br></br>
            <label>Category : {category}</label>
            <br></br>
            <label>Subcategory : </label>
            <input value={newsubcategory} onChange={ e => setNewsubcategory(e.target.value)}></input>
            <br></br>
            <span>{subcategoryerror}</span>
            <br></br>
            <button className="p-2 m-2 border" >Submit</button>
        </form>
    </div>
    )
}

export default Addsubcategory;