import { useState } from "react";
import { useSelector } from "react-redux";
import Error from "../pages/error";

const Editsubcategory = ({type,category,subcategory,close}) => {

    const { authtoken } = useSelector( state => state.user );

    const [newsubcategory,setNewsubcategory] = useState(subcategory);
    const [subcategoryerror,setsubcategoryerror] = useState("");

    const handlesubmit = async (e) => {
        e.preventDefault();
        setsubcategoryerror("");

        if(newsubcategory === subcategory)
        {
            close();
            return;
        }

        if(newsubcategory.trim() === "")
        {
            setsubcategoryerror("Subcategory cannot be empty");
            return 
        }

        const editsubcategoryquery = {
            query: `
                    
                    mutation
                    {
                        editSubcategory(
                            type:"${type}"
                            category:"${category}"
                            oldsubcategory:"${subcategory}"
                            newsubcategory:"${newsubcategory}"
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
        body: JSON.stringify(editsubcategoryquery),
        });
        res = await res.json();

        if (res.errors && res.errors[0].message === "newsubcategory already present") 
        {
            setsubcategoryerror("This sub-category already exists.");
            return;
        } 

        if (res.data.editSubcategory) 
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
};

export default Editsubcategory;
