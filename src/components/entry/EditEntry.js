import { useState } from "react";
import { useSelector } from "react-redux";
import Error from "../pages/error";

const EditEntry = ({ entry, close, setNewentry, setIseditted }) => {
  const { authtoken, expense, income, investment } = useSelector(
    (state) => state.user
  );

  const id = entry.id;
  const [amount, setAmount] = useState(entry.value);
  const [type, setType] = useState(entry.type);
  const [category, setCategory] = useState(entry.category);
  const [subcategory, setSubcategory] = useState(entry.subcategory);
  const [desc, setDesc] = useState(entry.desc);
  const [date, setDate] = useState(entry.date);

  //console.log(amount,type,category,subcategory,desc,date);

  const [errors, setErrors] = useState({
    amount: "",
    category: "",
    subcategory: "",
  });
  let categories = [];
  let subcategories = [];

  if (type) {
    switch (type) {
      case "expense":
        expense.categories.map((c) => categories.push(c.category));
        break;
      case "income":
        income.categories.map((c) => categories.push(c.category));
        break;
      case "investment":
        investment.categories.map((c) => categories.push(c.category));
        break;
    }
  }

  if (category !== "") {
    switch (type) {
      case "expense":
        expense.categories.map((c) => {
          if (c.category === category) {
            subcategories = c.subcategories;
          }
        });
        break;
      case "income":
        income.categories.map((c) => {
          if (c.category === category) {
            subcategories = c.subcategories;
          }
        });
        break;
      case "investment":
        investment.categories.map((c) => {
          if (c.category === category) {
            subcategories = c.subcategories;
          }
        });
        break;
    }
  }

  const dateinttostring = (intdate) => {
    const year = (intdate + "").substring(0, 4);
    const month = (intdate + "").substring(4, 6);
    const date = (intdate + "").substring(6, 8);

    //console.log(year, month, date);
    return `${year}-${month}-${date}`;
  };

  const handledate = (e) => {
    const datestring = e.target.value.split("-").join("");
    setDate(parseInt(datestring));
  };

  const handlesubmit = async (e) => {
    e.preventDefault();
    //console.log("submitted");
    let iserror = false;

    if (amount) {
      if (amount <= 0) {
        let temperror = { ...errors };
        temperror.amount = "Amount cannot be less than 1.";
        setErrors(temperror);
        iserror = true;
      }
    } else {
      let temperror = { ...errors };
      temperror.amount = "Amount cannot be empty.";
      setErrors(temperror);
      iserror = true;
    }

    if (category === "" || category === undefined) {
      let temperror = { ...errors };
      temperror.category = "Select a Category.";
      setErrors(temperror);
      iserror = true;
    }

    if (
      (subcategory === "" || subcategory === undefined) &&
      subcategories.length > 0
    ) {
      let temperror = { ...errors };
      temperror.subcategory = "Select a Sub-Category.";
      setErrors(temperror);
      iserror = true;
    }

    const addentryquery = {
      query: `
                        
                        mutation
                        {
                            editEntry(entry:{
                                id:"${id}",
                                value: ${amount},
                                type : "${type}",
                                category: "${category}",
                                ${
                                  subcategory
                                    ? `subcategory: "${subcategory}",`
                                    : ""
                                }
                                desc: "${desc}",
                                date: ${date}
                            })
                        }
                        
                    `,
    };

    let res;

    if (iserror === false) {
      try {
        res = await fetch(process.env.REACT_APP_API_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + authtoken,
          },
          body: JSON.stringify(addentryquery),
        });

        res = await res.json();
      } catch (err) {
        console.log(err);
        return <Error />;
      }

      if (res.errors) {
        res.errors.map((e) => console.log(e.message));
        return <Error />;
      }

      if (res.data.editEntry) {
        console.log("added", res.data.addEntry);
        const newentry = {
          id: id,
          value: amount,
          type: type,
          category: category,
          subcategory: subcategory,
          date: date,
          desc: desc,
        };
        setNewentry(newentry);
        setIseditted(true);
        close(false);
      }
    }
  };

  return (
    <tr>
      <td>
        <div className="absolute inset-1/4 bg-gray-500">
          <button onClick={() => close(false)}>Close</button>
          <form onSubmit={handlesubmit}>
            <div className="">
              <label htmlFor="value">Amount</label>
              <input
                type="number"
                id="amount"
                name="amount"
                value={amount}
                min="1"
                onChange={(e) => {
                  setAmount(e.target.value);
                  if (errors.amount) {
                    let temperror = { ...errors };
                    temperror.amount = "";
                    setErrors(temperror);
                  }
                }}
                className="border"
              ></input>
              <span>{errors.amount}</span>
            </div>

            <div className="">
              <label htmlFor="type">Type: </label>
              <span>{type}</span>
              {/* <select id="type" name="type" value={type} onChange={(e)=>{setType(e.target.value);setCategory("");setSubcategory("");}} className="border">
                                    <option value="expense">Expense</option>
                                    <option value="income">Income</option>
                                    <option value="investment">Investment</option>
                                </select> */}
            </div>

            <div className="">
              <label htmlFor="category">Category</label>
              <select
                id="category"
                name="category"
                value={category}
                onChange={(e) => {
                  setCategory(e.target.value);
                  setSubcategory("");
                }}
                className="border"
              >
                <option value="">Select a category</option>
                {type &&
                  categories.length > 0 &&
                  categories.map((c, index) => {
                    return (
                      <option key={index} value={c}>
                        {c}
                      </option>
                    );
                  })}
              </select>
              <span>{errors.category}</span>
            </div>

            <div className="">
              <label htmlFor="subcategory">SubCategory</label>
              <select
                id="subcategory"
                name="subcategory"
                value={subcategory}
                onChange={(e) => setSubcategory(e.target.value)}
                className="border"
              >
                <option value="">Select a subcategory</option>
                {category &&
                  subcategories.length > 0 &&
                  subcategories.map((c, index) => {
                    return (
                      <option key={index} value={c}>
                        {c}
                      </option>
                    );
                  })}
              </select>
              <span>{errors.subcategory}</span>
            </div>

            <div className="">
              <label htmlFor="date">Date</label>
              <input
                id="date"
                type="date"
                value={dateinttostring(date)}
                onChange={handledate}
              ></input>
            </div>

            <div>
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                maxLength="50"
                className="border"
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
              ></textarea>
              {desc.length >= 50 && (
                <span>Maximum of 50 characters allowed</span>
              )}
            </div>

            <button type="submit" className="p-2 border m-2">
              Submit
            </button>
          </form>
        </div>
      </td>
    </tr>
  );
};

export default EditEntry;
