// This is used to Display entries by Categories by
// taking categories and entries as input

import { useEffect, useState } from "react";
import CategoryChart from "../category/CategoryChart";
import DisplaySCEntries from "./DisplaySCEntries";

const DisplayCEntries = ({ entries, categories }) => {
  const [carray, setCarray] = useState({});
  const [show, setShow] = useState({});

  const handleshow = (category) => {
    const showtemp = { ...show };
    showtemp[category] = !showtemp[category];
    setShow(showtemp);
    //console.log(show);
  };

  useEffect(() => {
    const carray = {
      sumbycategory: {},
    };
    const show = {};
    if (categories) {
      categories.map((c) => {
        carray[c.category] = [];
        carray["sumbycategory"][c.category] = 0;
        show[c.category] = 0;
      });

      const sortbycategory = async (categories, entries) => {
        for (const c in categories) {
          for (const e in entries) {
            //console.log(categories[c].category, entries[e].category);
            if (entries[e].category === categories[c].category) {
              //console.log(entries[e]);
              carray["sumbycategory"][categories[c].category] =
                carray["sumbycategory"][categories[c].category] +
                entries[e].value;
              carray[categories[c].category] = [
                ...carray[categories[c].category],
                entries[e],
              ];
              //console.log(carray[categories[c].category]);
            }
            //console.log(JSON.stringify(carray["Exp"]));
          }
        }
      };
      sortbycategory(categories, entries);
      setCarray(carray);
      setShow(show);
    }
  }, [categories, entries]);

  //console.log(carray);

  if (categories.length > 0) {
    let Total = 0;
    return (
      <div className="md:flex">
        <div className="w-full md:w-2/5 max-h-300 p-2 flex justify-center">
          <CategoryChart totals={carray["sumbycategory"]}></CategoryChart>
        </div>
        <div className="w-full md:w-3/5">
          <table className="w-full tableborder">
            <thead>
              <tr>
                <th style={{ width: "90%" }}>Categories</th>
                <th>Totals</th>
              </tr>
            </thead>
            <tbody className="border">
              {categories.map((c, index) => {
                Total += carray["sumbycategory"]
                  ? carray["sumbycategory"][c.category]
                  : 0;
                return (
                  <tr key={index}>
                    <td>
                      <button
                        className="w-full"
                        onClick={() => {
                          handleshow(c.category);
                        }}
                      >
                        {c.category}
                      </button>
                      <div className={show[c.category] == true ? "" : "hidden"}>
                        {carray[c.category] ? (
                          <DisplaySCEntries
                            entries={carray[c.category]}
                            subcategories={c.subcategories}
                          />
                        ) : (
                          ""
                        )}
                      </div>
                    </td>
                    <td>
                      <span>
                        {carray
                          ? carray["sumbycategory"]
                            ? carray["sumbycategory"][c.category]
                            : ""
                          : ""}
                      </span>
                    </td>
                  </tr>
                );
              })}
              <tr>
                <td>
                  <span className="font-bold" style={{ padding: "5px" }}>
                    Total
                  </span>
                </td>
                <td>
                  <span className="font-bold" style={{ padding: "5px" }}>
                    {Total}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  } else {
    return <h1 style={{margin:'20px'}}>No categories. Create categories to add entries</h1>;
  }
};

export default DisplayCEntries;
