import { useState } from "react";
import { useSelector } from "react-redux";
import Error from "../pages/error";

const DeleteCategory = ({close,type,category}) => {

    const { authtoken } = useSelector((state) => state.user);

    const handledelete = async () => {

        const deletecategoryquery = {
            query:`
                mutation{
                    deleteCategory(
                        type:"${type}"
                        category:"${category}"
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
            body: JSON.stringify(deletecategoryquery),
        })

        res = await res.json();

        if(res.data.deleteCategory)
        {
            close()
            return
        }
        else
        {
            <Error />
        }
    }

    return(
        <div>
            <span>Are you sure. This deletes all entries with "{category}" as category</span>
            <br></br>
            <button className="m-2 p-2 border" onClick={handledelete}>
                Delete
            </button>
            <button className="m-2 p-2 border" onClick={()=>close(false)}>
                Close
            </button>
        </div>
    )
}

export default DeleteCategory;