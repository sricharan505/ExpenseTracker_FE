import { useSelector } from "react-redux";
import Error from "../pages/error";

const Deletesubcategory = ({type,category,subcategory,close}) => {

    const {authtoken} = useSelector(state => state.user);

    const handleDelete = async () => {

        const deletesubcategoryquery = {
            query:`
                mutation{
                    deleteSubcategory(
                        type:"${type}"
                        category:"${category}"
                        subcategory:"${subcategory}"
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
            body: JSON.stringify(deletesubcategoryquery),
        })

        res = await res.json();

        if(res.data.deleteSubcategory)
        {
            close();
            return
        }
        else
        {
            <Error />
        }
    }

    return(
        <div>
            <span>Are you sure ? Entries with this subcategory is also deleted</span>
            <br></br>
            <button className="p-2 m-2 border" onClick={handleDelete}>Delete</button>
            <button className="p-2 m-2 border" onClick={close}>Cancel</button>
        </div>
    )
};

export default Deletesubcategory;
