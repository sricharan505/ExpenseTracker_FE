import { useEffect, useState } from "react";
import Displaybytype from "../entry/Displaybytype";

const Expense = () => {
  return (
    <div className="bg-amber-200">
      <h2 className="text-center text-4xl md:text-5xl underline md:no-underline font-medium">Expense</h2>
      <br></br>
      
      <Displaybytype type="expense" />
    </div>
  );
};

export default Expense;
