import Displaybytype from "../entry/Displaybytype";

const Income = () => {
  return (
    <>
      <h2 className="text-center text-4xl md:text-5xl underline md:no-underline font-medium">Income</h2>
      <br></br>
      
      <Displaybytype type="income" />
    </>
  );
};

export default Income;
