import { useRef, useState } from "react";
import { useSelector } from 'react-redux'
import { Navigate } from "react-router-dom";
import { today, todaydate } from "../function";
import Error from "./error";

const CreateEntry = () => {

    const {authtoken, expense,income,investment} = useSelector(state => state.user);

    const [isAdded,setIsAdded] = useState(false);

    const [amount,setAmount] = useState();
    const [type, setType] = useState("expense");
    const [category,setCategory] = useState();
    const [subcategory, setSubcategory] = useState();
    const [desc, setDesc] = useState("");
    const [date, setDate] = useState(today());

    const [errors, setErrors] = useState({
        amount:"",
        category:"",
        subcategory:""
    })
    let categories=[];
    let subcategories=[];


    if(type)
    {
        switch(type)
        {
            case "expense":
                expense.categories.map(c => categories.push(c.category));
                break;
            case "income":
                income.categories.map(c => categories.push(c.category));
                break;
            case "investment":
                investment.categories.map(c => categories.push(c.category));
                break;
        }
    }

    if(category!=="")
    {
        switch(type)
        {
            case "expense":
                expense.categories.map(c => {if(c.category === category)
                { 
                    subcategories = c.subcategories 
                }});
                break;
            case "income":
                income.categories.map(c => {if(c.category === category)
                { 
                    subcategories = c.subcategories 
                }});
                break;
            case "investment":
                investment.categories.map(c => {if(c.category === category)
                { 
                    subcategories = c.subcategories 
                }});
                break;
        }
    }

    const handledate = (e) => {
        const datestring = (e.target.value).split('-').join('');
        setDate(parseInt(datestring));
    }

    const handlesubmit = async (e) => {

        e.preventDefault();
        //console.log("submitted");
        let iserror = false;

        if(amount)
        {
            if(amount<=0)
            {
                let temperror = { ...errors };
                temperror.amount = "Amount cannot be less than 1.";
                setErrors(temperror);
                iserror = true;
            }
        }
        else
        {
            let temperror = {...errors};
            temperror.amount = "Amount cannot be empty."
            setErrors(temperror);
            iserror = true;
        }

        if(category === "")
        {
            let temperror = { ...errors };
            temperror.category = "Select a Category.";
            setErrors(temperror);
            iserror = true;
        }

        if (subcategory === "" && subcategories.length > 0) 
        {
            let temperror = { ...errors };
            temperror.category = "Select a Sub-Category.";
            setErrors(temperror);
            iserror = true;
        }

        const addentryquery = {
            query: `
                        
                        mutation
                        {
                            addEntry(entry:{
                                value: ${amount},
                                type : "${type}",
                                category: "${category}",
                                ${subcategory ? `subcategory: "${subcategory}",`:''}
                                desc: "${desc}",
                                date: ${date}
                            })
                        }
                        
                    `,
            };

        let res; 

        if(iserror === false)
        {
            try
            {
                res = await fetch(process.env.REACT_APP_API_URL, {
                    method: "POST",
                    headers: { 
                        "Content-Type": "application/json",
                        Authorization: "Bearer " + authtoken 
                    },
                    body: JSON.stringify(addentryquery)
                });

                res = await res.json();
            }
            catch(err)
            {
                console.log(err);
                return(<Error/>);
            }
            
            if(res.errors)
            {
                res.errors.map(e => console.log(e.message));
                return(<Error/>);
            }

            if(res.data.addEntry)
            {
                console.log("added",res.data.addEntry);
                setIsAdded(true);
            }
        }
        //console.log(res);
    }

    //console.log(amount,type,category,subcategory,desc,date);

    return (
        <>
            <span>Create Entry</span>
            <br></br>
            <br></br>
            <form onSubmit={(e)=>handlesubmit(e)}>

                <div>
                    <label htmlFor="amount">Amount</label>
                    <input type="number" id="amount" name="amount" value={amount} min="1" onChange={(e)=>{
                        setAmount(e.target.value);
                        if(errors.amount)
                        {
                            let temperror = { ...errors };
                            temperror.amount = "";
                            setErrors(temperror);
                        }
                    }} className="border"></input>
                    <span>{errors.amount}</span>
                </div>

                <br></br>

                <div>
                    <label htmlFor="type">Type</label>
                    <select id="type" name="type" value={type} onChange={(e)=>{setType(e.target.value); setCategory();setSubcategory();}} className="border">
                        <option value="expense">Expense</option>
                        <option value="income">Income</option>
                        <option value="investment">Investment</option>
                    </select>
                    
                </div>

                <br></br>

                <div>
                    <label htmlFor="category">Category</label>
                    <select id="category" name="category" value={category} onChange={(e)=>{setCategory(e.target.value);setSubcategory();}} className="border">
                        <option value="">Select a category</option>
                        {
                            (categories.length > 0) && categories.map((c,index)=>{
                                return <option key={index} value={c}>{c}</option>
                            })
                        }
                    </select>
                    <span>{errors.category}</span>
                </div>

                <br></br>

                <div>
                    <label htmlFor="subcategory">SubCategory</label>
                    <select id="subcategory" name="subcategory" value={subcategory} onChange={(e)=>setSubcategory(e.target.value)} className="border">
                        <option value="">Select a category</option>
                        {
                            (subcategories.length > 0) && subcategories.map((c,index)=>{
                                return <option key={index} value={c}>{c}</option>
                            })
                        }
                    </select>
                    <span>{errors.subcategory}</span>
                </div>

                <br></br>

                <div>
                    <label htmlFor="description">Description</label>
                    <textarea id="description" maxLength="50" className="border" value={desc} onChange={(e)=>setDesc(e.target.value)}>

                    </textarea>
                    { desc.length >= 50  && <span>Maximum of 50 characters allowed</span>}
                </div>

                <br></br>

                <div>
                    <label htmlFor='date'>Date</label>
                    <input id="date" type="date" className="border" defaultValue={todaydate()} onChange={(e)=>handledate(e)}></input>
                </div>

                <br></br>

                <button className="border p-2" type="submit" > Submit </button>

            </form>
            {isAdded && <Navigate to="/home" replace={true} /> }
        </>
    );
}

export default CreateEntry;