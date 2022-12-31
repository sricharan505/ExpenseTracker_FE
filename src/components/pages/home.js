import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { loadcategories } from "../../features/User/userSlice";
import Expense from "./Expense";
import Income from "./Income";
import Investment from "./Investement";

const Home = () => {
  return (
    <div className="px-4">
      <br></br>

      <Expense></Expense>

      <br></br>

      <Income></Income>

      <br></br>

      <Investment></Investment>

      <br></br>
      <br></br>
    </div>
  );
};

export default Home;
