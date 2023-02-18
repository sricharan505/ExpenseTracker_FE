import { useEffect, useState } from "react";
import {
  loadentries,
  loadcategories,
  loadtotal,
} from "../../features/User/userSlice";
import { useSelector, useDispatch } from "react-redux";
import {
  genint,
  prevdatefunc,
  nextdatefunc,
  prevmonthfunc,
  nextmonthfunc,
} from "../../function";
import DisplayCEntries from "./DisplayCEntries";
import CreateEntry from "./CreateEntry";
import Editcategory from "../category/DisplayCategories";

const Displaybytype = ({ type }) => {
  const [createentry, setCreateentry] = useState(false);
  const [Editcategories, setEditcategories] = useState(false);

  const [byday, setByday] = useState(1);
  const [bymonth, setBymonth] = useState(0);
  const [byyear, setByyear] = useState(0);
  const [byperiod, setByperiod] = useState(0);

  const [date, setDate] = useState(new Date().getDate());
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [year, setYear] = useState(new Date().getFullYear());

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const {
    authtoken,
    expense,
    income,
    investment,
    rerenderExpense,
    rerenderIncome,
    rerenderInvestment,
  } = useSelector((state) => state.user);

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
    dispatch(
      loadcategories({ type: type, categories: res.data.getCategories })
    );
  };

  const getentries = async ({
    type,
    startdate = "",
    enddate = "",
    category = "",
    subcategory = "",
  }) => {
    const getentriesquery = {
      query: `
                {
                    getEntries(conditions:{
                        type:"${type}"
                        ${startdate ? `startdate:${startdate}` : ""}
                        ${enddate ? `enddate:${enddate}` : ""}
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
    dispatch(loadentries({ type: type, entries: res.data.getEntries }));
  };

  const gettotals = async (type) => {
    const gettotalsquery = () => {
      return {
        query: `
                {
                    getTotals
                    {
                        ${type}
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
      body: JSON.stringify(gettotalsquery()),
    });
    res = await res.json();
    dispatch(loadtotal({ type: type, total: res.data.getTotals[type] }));
  };

  const prevdate = () => {
    const [d, m, y] = prevdatefunc(date, month, year);
    getentries({
      type: type,
      startdate: "" + genint(y, m, d),
    });
    setDate(d);
    setMonth(m);
    setYear(y);
  };

  const nextdate = () => {
    const [d, m, y] = nextdatefunc(date, month, year);
    getentries({
      type: type,
      startdate: "" + genint(y, m, d),
    });
    setDate(d);
    setMonth(m);
    setYear(y);
  };

  const nextmonth = () => {
    let [m, y] = nextmonthfunc(month, year);

    setMonth(m);
    setYear(y);

    getentries({
      type: type,
      startdate: "" + genint(y, m, 1),
      enddate: "" + genint(y, m, new Date(y, m, 0).getDate()),
    });
  };

  const prevmonth = () => {
    let [m, y] = prevmonthfunc(month, year);

    setMonth(m);
    setYear(y);

    getentries({
      type: type,
      startdate: "" + genint(y, m, 1),
      enddate: "" + genint(y, m, new Date(y, m, 0).getDate()),
    });
  };

  const nextyear = () => {
    let y = year + 1;
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
    const startdate = "" + genint(year, 1, 1);
    const enddate = "" + genint(year, 12, new Date(year, month, 0).getDate());
    setByday(0);
    setBymonth(0);
    setByyear(1);
    setByperiod(0);
    getentries({
      type: type,
      startdate: startdate,
      enddate: enddate,
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
      startdate: startdate,
      enddate: enddate,
    });
    setStartDate(startdate);
    setEndDate(enddate);
    console.log(startdate, enddate);
  };

  useEffect(() => {
    if (type === "expense" || (type === "expense" && Editcategories === false)) 
    {
      //console.log("editted expense by type");
      if (byday) {
        handleday();
      } else if (bymonth) {
        handlemonth();
      } else if (byyear) {
        handleyear();
      } else {
        getentries({
          type: type,
          startdate: startDate,
          enddate: endDate,
        });
      }
      getcategories();
      gettotals(type);
    }
  }, [rerenderExpense,Editcategories]);

  useEffect(() => {
    if (type === "income") {
      //console.log("editted income by type");
      if (byday) {
        handleday();
      } else if (bymonth) {
        handlemonth();
      } else if (byyear) {
        handleyear();
      } else {
        getentries({
          type: type,
          startdate: startDate,
          enddate: endDate,
        });
      }
      getcategories();
      gettotals(type);
    }
  }, [rerenderIncome]);

  useEffect(() => {
    if (type === "investment") {
      //console.log("editted investment by type");
      if (byday) {
        handleday();
      } else if (bymonth) {
        handlemonth();
      } else if (byyear) {
        handleyear();
      } else {
        getentries({
          type: type,
          startdate: startDate,
          enddate: endDate,
        });
      }
      getcategories();
      gettotals(type);
    }
  }, [rerenderInvestment]);

  // useEffect(()=>{
  //     getcategories();
  //     getentries({type:type,startdate:'' + genint(year,month,date)});
  //     gettotals(type);
  // },[]);

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
    12: "Dec",
  };

  const day = new Date(year, month - 1, date).getDay();
  const DateString = `${daynames[day]}, ${date < 10 ? "0" : ""}${date} - 
    ${monthnames[month]} - ${year}`;

  const monthString = `${monthnames[month]} - ${year}`;

  const yearString = `${year}`;
  if (createentry) {
    return <CreateEntry close={setCreateentry} defaulttype={type} />;
  }

  if (Editcategories) {
    return <Editcategory type={type} close={setEditcategories} />;
  }

  return (
    <div className="text-center">
      <div className="text-lg p-2 m-2">
        <span className="font-bold p-2 m-2">
          All Time -{" "}
          {type === "expense"
            ? expense.total
            : type === "income"
            ? income.total
            : investment.total}
        </span>
      </div>
      <div>
        <div className="grid grid-cols-4 text-xl">
          <button
            onClick={handleday}
            className={`${byday ? "flex justify-center align-center border border-zinc-900" : "border-0"} py-2 px-6`}
          >
            Day
          </button>

          <button
            onClick={handlemonth}
            className={`${bymonth ? "flex justify-center align-center border border-zinc-900" : "border-0"} py-2 px-6`}
          >
            Month
          </button>

          <button
            onClick={handleyear}
            className={`${byyear ? "flex justify-center align-center border border-zinc-900" : "border-0"} py-2 px-6`}
          >
            Year
          </button>

          <button
            onClick={handleperiod}
            className={`${byperiod ? "flex justify-center align-center border border-zinc-900" : "border-0"} py-2 px-6`}
          >
            Period
          </button>
        </div>

        {byperiod == 1 ? (
          <div
            className={`flex justify-center align-center space-x-6 text-center border border-zinc-900 p-2 py-3`}
          >
            <form onSubmit={(e) => handlepdates(e)}>
              <label htmlFor="from">From : </label>
              <input id="from" name="from" type="date" className="bg-amber-200 border border-zinc-900 p-1"></input>

              <label htmlFor="to" className="pl-3">
                To :{" "}
              </label>
              <input id="to" name="to" type="date" className="bg-amber-200 border border-zinc-900 p-1"></input>

              <button type="submit" className="border-2 border-zinc-900 rounded-lg ml-4 py-2 px-6">
                OK
              </button>
            </form>
          </div>
        ) : (
          <div className="flex justify-center space-x-6 text-center border border-zinc-900 p-2 py-3">
            <button
              onClick={byday ? prevdate : bymonth ? prevmonth : prevyear}
              className="border-2 border-zinc-900 rounded-lg py-2 px-6"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6"
              >
                <path d="M9.195 18.44c1.25.713 2.805-.19 2.805-1.629v-2.34l6.945 3.968c1.25.714 2.805-.188 2.805-1.628V8.688c0-1.44-1.555-2.342-2.805-1.628L12 11.03v-2.34c0-1.44-1.555-2.343-2.805-1.629l-7.108 4.062c-1.26.72-1.26 2.536 0 3.256l7.108 4.061z" />
              </svg>
            </button>
            <span className="py-2 px-2 sm:text-lg">
              {byday ? DateString : bymonth ? monthString : yearString}
            </span>
            <button
              onClick={byday ? nextdate : bymonth ? nextmonth : nextyear}
              className="border-2 border-zinc-900 rounded-lg py-2 px-6"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6"
              >
                <path d="M5.055 7.06c-1.25-.714-2.805.189-2.805 1.628v8.123c0 1.44 1.555 2.342 2.805 1.628L12 14.471v2.34c0 1.44 1.555 2.342 2.805 1.628l7.108-4.061c1.26-.72 1.26-2.536 0-3.256L14.805 7.06C13.555 6.346 12 7.25 12 8.688v2.34L5.055 7.06z" />
              </svg>
            </button>
          </div>
        )}

        {type === "expense" && (
          <>
            <DisplayCEntries
              entries={expense.entries}
              categories={expense.categories}
              type="expense"
            />
            {expense.categories.length > 0 && (
              <button
                className="p-2 m-4 border-2 rounded border-zinc-900"
                onClick={() => setCreateentry(true)}
              >
                Create entry
              </button>
            )}
          </>
        )}

        {type === "income" && (
          <>
            <DisplayCEntries
              entries={income.entries}
              categories={income.categories}
              type="income"
            />
            {income.categories.length > 0 && (
              <button
                className="p-2 m-4 border-2 rounded border-zinc-900"
                onClick={() => setCreateentry(true)}
              >
                Create entry
              </button>
            )}
          </>
        )}

        {type === "investment" && (
          <>
            <DisplayCEntries
              entries={investment.entries}
              categories={investment.categories}
              type="investment"
            />
            {investment.categories.length > 0 && (
              <button
                className="p-2 m-4 border-2 rounded border-zinc-900"
                onClick={() => setCreateentry(true)}
              >
                Create entry
              </button>
            )}
          </>
        )}

        <button
          className="p-2 m-4 border-2 rounded border-zinc-900"
          onClick={() => setEditcategories(true)}
        >
          Add/Edit Categories
        </button>
      </div>
    </div>
  );
};

export default Displaybytype;
