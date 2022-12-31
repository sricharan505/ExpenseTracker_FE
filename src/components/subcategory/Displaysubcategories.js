import { useState } from "react";
import Displaysubcategory from "./Displaysubcategory";
import Editsubcategory from "./Editsubcategory";

const Displaysubcategories = ({type,category,subcategories,rerender}) => {


    return(
        <table className="w-full">
            <thead>
                <tr><th>Sub-categories</th></tr>
            </thead>
            <tbody>
                {
                subcategories.map((s,i) => {
                    //console.log(s);
                    return(
                    <tr key={i}>
                        <td>
                            <Displaysubcategory type={type} category={category} subcategory={s} rerender={rerender}/>
                        </td>
                    </tr>
                    );
                })
                }
            </tbody>
        </table>
    )
}

export default Displaysubcategories;