// This is used to display the sucategories after receiving the entries seperated by
// categories and subcategories as input.

import {useEffect, useState} from 'react';
import DisplaySingleEntry from "./DisplaySingleEntry";

const DisplaySCEntries = ({entries,subcategories}) => {

    const [scarray, setScarray] = useState({});
    const [show,setShow] = useState({});

    const handleshow = (subcategory) =>{
        const showtemp = {...show};
        showtemp[subcategory] = !showtemp[subcategory];
        setShow(showtemp);
        console.log(show);
    }

    useEffect(() => {
        if(subcategories.length !== 0)
        {
            const sortbysubcategory = (entries,subcategories) => {
                const scarray = {
                    sum: {},
                };

                const show = {};
        
                subcategories.map((s) => {
                    scarray[s] = [];
                    scarray["sum"][s] = 0;
                    show[s] = 0;
                });

                setShow(show);

                for( const s in subcategories)
                {
                    for(const e in entries)
                    {
                        //console.log(subcategories[s], entries[e].subcategory);
                        if(subcategories[s] === entries[e].subcategory)
                        {   
                            scarray["sum"][subcategories[s]] =
                                scarray["sum"][subcategories[s]] + entries[e].value;
                            scarray[subcategories[s]].push(entries[e]);
                        }
                    }
                }

                return scarray;
            }

            setScarray(sortbysubcategory(entries, subcategories));
            
        }
    }, [subcategories, entries]);

    if(subcategories.length !== 0)
    {
        // console.log(entries);
        // console.log(subcategories);
        // console.log(scarray);
        return(
            <table className="w-full">
                <thead>
                    <tr>
                        <th style={{width:"90%"}}>Sub-Categories</th>
                        <th>Sub-totals</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        subcategories.map( (s,index) => {
                            //console.log(scarray[s]);
                            return(
                                <tr key={index}>
                                    <td>
                                        <button className="w-full" onClick={()=>{handleshow(s)}}>
                                            {s}
                                        </button>
                                        <div className={ show[s]==true ? "" : "hidden"}>
                                            {
                                                scarray[s] && (scarray[s].length>0 && <table className="w-full">
                                                    <thead>
                                                        <tr>
                                                            <td style={{width:"70%"}}>Entry description</td>
                                                            <td style={{width:"20%"}}>Date</td>
                                                            <td style={{width:"10%"}}>Value</td>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {scarray[s].map((e) => {
                                                            return <DisplaySingleEntry key={e.id} entry={e} />;
                                                        })}
                                                    </tbody>
                                                </table>)
                                            }
                                        </div>
                                    </td>
                                    <td>
                                        {scarray['sum'] && scarray['sum'][s]}
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        )

    }
    else if(entries.length !== 0)
    {
        //console.log(entries)
        return (
            <table>
                <thead>
                    <tr>
                        <td>Entry description</td>
                        <td>Date</td>
                        <td>Value</td>
                    </tr>
                </thead>
                <tbody>
                {
                    entries.map((e)=>{
                        return <DisplaySingleEntry key={e.id} entry={e} /> ;
                    })
                }
                </tbody>
            </table>
        )
    }
    else
    {
        <p>No entries</p>
    }

}

export default DisplaySCEntries;