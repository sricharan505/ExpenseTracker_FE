import { useEffect,useState } from 'react';
import { loadentries,loadcategories } from '../features/User/userSlice';
import { useSelector,useDispatch } from 'react-redux';
import { genint, prevdatefunc, nextdatefunc, prevmonthfunc, nextmonthfunc } from "../function";
import DisplayCEntries from "./DisplayCEntries";

const Displaybytype = ({type}) =>{
    const [byday, setByday] = useState(1);
    const [bymonth, setBymonth] = useState(0);
    const [byyear, setByyear] = useState(0);
    const [byperiod, setByperiod] = useState(0);

    const [date, setDate] = useState(new Date().getDate());
    const [month, setMonth] = useState(new Date().getMonth() + 1);
    const [year, setYear] = useState(new Date().getFullYear());

    const { authtoken, expense, income, investment } = useSelector((state) => state.user);

    const dispatch = useDispatch();

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
        dispatch(loadcategories({ type:type,categories: res.data.getCategories }));
    }

    const getentries = async ({type,startdate='',enddate='',category='',subcategory=''}) => {
        const getentriesquery = {
            query: `
                {
                    getEntries(conditions:{
                        type:"${type}"
                        ${startdate ? `startdate:${startdate}` : ""}
                        ${enddate ? `enddate:${enddate}`: ""}
                        ${category ? `category:"${category}"` : ""}
                        ${subcategory ? `subcategory:"${subcategory}"` : ""}
                    })
                    {
                        id value type category subcategory desc date
                    }
                }
            `,
        };

        let res = await fetch(process.env.REACT_APP_API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + authtoken,
            },
            body: JSON.stringify(getentriesquery),
        });
        res = await res.json();
        //console.log(res.data.getEntries);
        dispatch(loadentries({type:type,entries:res.data.getEntries}))
    };

    const prevdate = () => {
        const [d,m,y] = prevdatefunc(date,month,year);
        getentries({
            type: type,
            startdate: "" + genint(y, m, d),
        });
        setDate(d);setMonth(m);setYear(y);
    };

    const nextdate = () => {
        const [d, m, y] = nextdatefunc(date, month, year);
        getentries({
            type: type,
            startdate: "" + genint(y, m, d),
        });
        setDate(d);setMonth(m);setYear(y);
    };

    const nextmonth = () => {
        
        let [m,y] = nextmonthfunc(month,year);

        setMonth(m);
        setYear(y);

        getentries({
            type: type,
            startdate: "" + genint(y, m, 1),
            enddate: "" + genint(y, m, new Date(y, m, 0).getDate()),
        });
    };

    const prevmonth = () => {
        let [m,y] = prevmonthfunc(month,year);

        setMonth(m);
        setYear(y);

        getentries({
            type: type,
            startdate: "" + genint(y, m, 1),
            enddate: "" + genint(y, m, new Date(y, m, 0).getDate())
        });
        
    };

    const nextyear = () => {
        let y= year+1;
        setYear(y);
        getentries({
            type: type,
            startdate: "" + genint(y, 1, 1),
            enddate: "" + genint(y, 12, new Date(y, 12, 0).getDate()),
        });
    };

    const prevyear = () => {
        let y = year - 1;
        setYear(y);
        getentries({
            type: type,
            startdate: "" + genint(y, 1, 1),
            enddate: "" + genint(y, 12, new Date(y, 12, 0).getDate()),
        });
    };

    const handleday = () => {
        setByday(1);
        setBymonth(0);
        setByyear(0);
        setByperiod(0);
        getentries({
            type: type,
            startdate: "" + genint(year, month, date),
        });
    };

    const handlemonth = () => {
        setByday(0);
        setBymonth(1);
        setByyear(0);
        setByperiod(0);
        getentries({
            type: type,
            startdate: "" + genint(year, month, 1),
            enddate: "" + genint(year, month, new Date(year, month, 0).getDate()),
        });
    };

    const handleyear = () => {
        setByday(0);
        setBymonth(0);
        setByyear(1);
        setByperiod(0);
        getentries({
            type: type,
            startdate: "" + genint(year, 1, 1),
            enddate: "" + genint(year, 12, new Date(year, month, 0).getDate()),
        });
    };

    const handleperiod = () => {
        setByday(0);
        setBymonth(0);
        setByyear(0);
        setByperiod(1);
    };

    const handlepdates = (e) => {
        e.preventDefault();
        const startdate = e.target.from.value.split("-").join("");
        const enddate = e.target.to.value.split("-").join("");

        getentries({
            type: type,
            startdate: startdate ,
            enddate: enddate
        });

        console.log(startdate,enddate);
    }

    useEffect(()=>{
        getcategories();
        getentries({type:type,startdate:''+genint(year,month,date)});
    },[])

    const daynames = {
        0: "Sunday",
        1: "Monday",
        2: "Tuesday",
        3: "Wednesday",
        4: "Thrusday",
        5: "Friday",
        6: "Saturday",
    };

    const monthnames = {
        1: "Jan",
        2: "Feb",
        3: "Mar",
        4: "Apr",
        5: "May",
        6: "June",
        7: "July",
        8: "Aug",
        9: "Sep",
        10: "Oct",
        11: "Nov",
        12: "Dec"
    };

    const day = new Date(year,month-1,date).getDay();
    const DateString = `${daynames[day]}, ${date < 10 ? "0" : ""}${date} - 
    ${monthnames[month]} - ${year}`;

    const monthString = `${monthnames[month]} - ${year}`;

    const yearString = `${year}`;

    return (
        <div>
            <div className="grid grid-cols-4 divide-x text-xl border">
                <button onClick={handleday} className={`${byday?"shadow-md border":""} py-2 px-6`}>
                    Day
                </button>

                <button onClick={handlemonth} className={`${bymonth?"shadow-md border":""} py-2 px-6`}>
                    Month
                </button>

                <button onClick={handleyear} className={`${byyear?"shadow-md border":""} py-2 px-6`}>
                    Year
                </button>

                <button onClick={handleperiod} className={`${byperiod?"shadow-md border":""} py-2 px-6`}>
                    Period
                </button>
            </div>

            {
                byperiod==1 ?
                
                <div className={`flex justify-center space-x-6 text-center border p-2 pt-3`}>
                    <form onSubmit={(e)=>handlepdates(e)}>
                        <label htmlFor='from'>From:</label>
                        <input id="from" name="from" type='date'></input>

                        <label htmlFor='to'>To:</label>
                        <input id="to" name="to" type='date'></input>

                        <button type="submit" className="border">OK</button>
                    </form>
                </div>
            
                :    

                <div className="flex justify-center space-x-6 text-center border p-2 pt-3">
                    <button onClick={byday ? prevdate : (bymonth ? prevmonth : prevyear)} className="border py-2 px-6">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                            <path d="M9.195 18.44c1.25.713 2.805-.19 2.805-1.629v-2.34l6.945 3.968c1.25.714 2.805-.188 2.805-1.628V8.688c0-1.44-1.555-2.342-2.805-1.628L12 11.03v-2.34c0-1.44-1.555-2.343-2.805-1.629l-7.108 4.062c-1.26.72-1.26 2.536 0 3.256l7.108 4.061z" />
                        </svg>
                    </button>
                    <span className="py-2 px-2 sm:text-lg">
                        {byday ? DateString : (bymonth ? monthString : yearString)}
                    </span>
                    <button onClick={byday ? nextdate : (bymonth ? nextmonth : nextyear)} className="border py-2 px-6">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                            <path d="M5.055 7.06c-1.25-.714-2.805.189-2.805 1.628v8.123c0 1.44 1.555 2.342 2.805 1.628L12 14.471v2.34c0 1.44 1.555 2.342 2.805 1.628l7.108-4.061c1.26-.72 1.26-2.536 0-3.256L14.805 7.06C13.555 6.346 12 7.25 12 8.688v2.34L5.055 7.06z" />
                        </svg>
                    </button>
                </div>
            
            }

            {type === "expense" && (
            <DisplayCEntries
                entries={expense.entries}
                categories={expense.categories}
            />
            )}

            {type === "income" && (
            <DisplayCEntries
                entries={income.entries}
                categories={income.categories}
            />
            )}

            {type === "investment" && (
            <DisplayCEntries
                entries={investment.entries}
                categories={investment.categories}
            />
            )}
        </div>
    );

}

export default Displaybytype;