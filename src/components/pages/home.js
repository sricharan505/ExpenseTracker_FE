import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Expense from "./Expense";
import Income from "./Income";
import Investment from "./Investement";


const Home = () => {

  const {showexpense,showincome,showinvestment} = useSelector(state => state.user);

  return (
    <div className="px-4 bg-purple-100 min-h-screen">
      <br></br>

      <div className={showexpense ? "pb-12 " : "pb-12 md:hidden"}>
        <Expense></Expense>
      </div>

      <div className={showincome ? "" : "pb-12 md:hidden"}>
        <Income></Income>
      </div>

      <div className={showinvestment ? "" : "pb-12 md:hidden"}>
        <Investment></Investment>
      </div>

      <br></br>
      <br></br>
    </div>
  );
};

export default Home;
