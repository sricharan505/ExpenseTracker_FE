import { useEffect, useState } from "react";
import Displaybytype from "../entry/Displaybytype";

const Expense = () => {
  return (
    <>
      <h2 className="text-center text-3xl">Expense</h2>
      <br></br>
      <br></br>
      <Displaybytype type="expense" />
    </>
  );
};

export default Expense;
