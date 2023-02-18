import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import DisplayCategory from "./DisplayCategory";
import Addcategory from "./AddCategory";
import {setrerenderExpense,setrerenderIncome,setrerenderInvestment} from '../../features/User/userSlice';

const Displaycategories = ({ type, close }) => {
  const { expense, income, investment } = useSelector((state) => state.user);
  const [categories, setCategories] = useState([]);
  const [addcategory, setAddcategory] = useState(false);
  const [renderlist, setrenderlist] = useState(false);

  const handlerenderlist = () => {
    setrenderlist(!renderlist);
  }

  const getcategory = () => {
    if (type === "expense") 
    {
      return expense.categories;
    }
    else if (type === "income") 
    {
      return income.categories;
    } 
    else 
    {
      return investment.categories;
    }
  };

  useEffect(() => 
  {
    if (addcategory === false) 
    {
      setCategories(getcategory);
    }
  }, [addcategory,renderlist]);

  //console.log(getcategory())

  return (
    <div className="flex justify-center align-center">
      {addcategory && (
        <div className="absolute inset-1/4 bg-gray-500">
          <Addcategory close={setAddcategory} type={type} />
        </div>
      )}
      <div className="w-full flex flex-col justify-center" style={{maxWidth:"700px"}}>
        <table className="w-full">
          <thead>
            <tr>
              <th className="flex content-center justify-center py-2 px-4">
                <span className="flex content-center items-center justify-center p-2 text-2xl">
                  Categories
                </span>
                <button
                  className="p-1 px-2 ml-3 border border-zinc-900"
                  onClick={() => setAddcategory(true)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 4.5v15m7.5-7.5h-15"
                    />
                  </svg>
                </button>
              </th>
            </tr>
          </thead>
          <tbody>
            {categories.length > 0 ? (
              categories.map((c,index) => {
                return (
                  <tr key={index}>
                    <DisplayCategory
                      type={type}
                      category={c.category}
                      subcategories={c.subcategories}
                      renderlist={handlerenderlist}
                    />
                  </tr>
                );
              })
            ) : (
              <tr>
                <th>No Categories</th>
              </tr>
            )}
          </tbody>
        </table>
        <button className="p-2 my-2 border border-zinc-900 w-full" onClick={() => close(false)}>
          Back
        </button>
      </div>
    </div>
  );
};

export default Displaycategories;
