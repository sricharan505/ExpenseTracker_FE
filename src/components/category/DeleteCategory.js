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
        <div className="bg-purple-500 text-xl p-8 rounded-2xl">
            <span>Are you sure. This deletes all entries with <span className="font-bold">"{category}"</span> as category</span>
            <br></br>
            <button className="m-4 p-2 border rounded bg-red-500" onClick={handledelete}>
                Delete
            </button>
            <button className="m-4 p-2 border rounded bg-green-500" onClick={()=>close(false)}>
                Close
            </button>
        </div>
    )
}

export default DeleteCategory;