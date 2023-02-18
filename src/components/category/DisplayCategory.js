import { useState } from "react";
import { useSelector,useDispatch } from "react-redux";
import Displaysubcategories from "../subcategory/Displaysubcategories";
import Addsubcategory from '../subcategory/Addsubcategory';
import EditCategory from "./EditCategory";
import DeleteCategory from "./DeleteCategory";
import { loadcategories } from "../../features/User/userSlice";

const DisplayCategory = ({type,category,subcategories,renderlist}) => {
    //console.log(type,category,subcategories);

    const { authtoken } = useSelector((state) => state.user);
    const dispatch = useDispatch();

    const [displaysub, setDisplaysub] = useState(false);
    const [Editcategory, setEditcategory] = useState(false);
    const [deletecategory, setDeletecategory] = useState(false);
    const [addsubcategory, setAddsubcategory] = useState(false);

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

    const handleclose = async() => {
        //console.log("handleclose Displaycategory");
        await getcategories();
        renderlist();
        setEditcategory(false);
        setDeletecategory(false);
        setAddsubcategory(false);
    }

    if(addsubcategory)
    {
        return (
            <div className="absolute inset-1/4 bg-gray-500">
                <Addsubcategory close={handleclose} type={type} category={category} />
            </div>
        );
    }

    if(Editcategory)
    {
        return (
            <div className="absolute inset-1/4 bg-gray-500">
                <EditCategory close={handleclose} type={type} category={category}  />
            </div>
        );
    }

    if(deletecategory)
    {
        return (
            <div className="absolute inset-1/4 bg-gray-500">
                <DeleteCategory close={handleclose} type={type} category={category} />
            </div>
        );
    }

    return(<>
        <td className="w-full">
            <div className="grid grid-cols-2">
                <div className="flex justify-center content-center">
                    <button onClick={()=>setDisplaysub(!displaysub)} className="w-full h-full flex flex-wrap justify-center content-center">
                        <span className="flex content-center items-center justify-between px-2">
                            {category} 
                            {subcategories.length>0 && 
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={displaysub ? "w-4 h-4 ml-2 rotate-90" : "w-4 h-4 ml-2"}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                            </svg>
                            }
                        </span>
                    </button>
                </div>
                <div>
                    <button className="p-2 m-2 bg-cyan-500 rounded-lg" onClick={()=>setEditcategory(true)} >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
                        </svg>
                    </button>
                    <button className="p-2 m-2 bg-red-500 rounded-lg" onClick={()=>setDeletecategory(true)}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                        </svg>
                    </button>
                    <button className="p-2 m-2 bg-lime-500 rounded-lg" onClick={()=>setAddsubcategory(true)}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>
                    </button>
                    
                </div>
            </div>
            {
            subcategories.length>0 && (displaysub && 
                <Displaysubcategories type={type} category={category} subcategories={subcategories} rerender={handleclose}/>
                )
            }
        </td>
        </>
    )
}

export default DisplayCategory;