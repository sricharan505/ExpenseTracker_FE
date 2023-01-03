import { useState } from "react";
import DeleteEntry from "./DeleteEntry";
import EditEntry from "./EditEntry";
import {
  setrerenderExpense,
  setrerenderIncome,
  setrerenderInvestment,
} from "../../features/User/userSlice";
import { useDispatch } from "react-redux";

const DisplayEntry = ({ entry, close }) => {
  //console.log(entry);
  const dispatch = useDispatch();

  const [newentry, setNewentry] = useState(entry);
  const [edit, setEdit] = useState(false);
  const [iseditted, setIseditted] = useState(false);

  const [candelete, setCandelete] = useState(false);
  const [isdeleted, setIsdeleted] = useState(false);

  const handleClose = () => {
    if (iseditted || isdeleted) 
    {
      if (newentry.type === "expense") {
        dispatch(setrerenderExpense());
      } else if (newentry.type === "income") {
        dispatch(setrerenderIncome());
      } else {
        dispatch(setrerenderInvestment());
      }
      setIseditted(false);
      setIsdeleted(false);
      close(false);
    }
    else
    {
      close(false);
    }
  };

  if (isdeleted) {
    return (
      <tr>
        <td>
          <div className="absolute inset-1/4 bg-gray-500">
            <span>Entry has been deleted.</span>
            <br></br>
            <button className="border p-2 m-2" onClick={handleClose}>
              Close
            </button>
          </div>
        </td>
      </tr>
    );
  }

  if (edit) {
    //console.log("editting")
    return (
      <EditEntry
        entry={newentry}
        close={setEdit}
        setNewentry={setNewentry}
        setIseditted={setIseditted}
      />
    );
  }

  if (candelete) {
    return (
      <DeleteEntry
        id={newentry.id}
        close={setCandelete}
        setIsdeleted={setIsdeleted}
      />
    );
  }

  return (
    <tr>
      <td>
        <div className="absolute inset-1/4 bg-gray-500">
          <div>
            <button onClick={handleClose}>close</button>
          </div>

          <br></br>
          <label>Amount - </label>
          <span>{newentry.value}</span>
          <br></br>
          <label>Date - </label>
          <span>{newentry.date}</span>
          <br></br>
          <label>Type - </label>
          <span>{newentry.type}</span>
          <br></br>
          <label>Category - </label>
          <span>{newentry.category}</span>
          <br></br>
          <label>Subcategory - </label>
          <span>{newentry.subcategory}</span>
          <br></br>
          <label>Description - </label>
          <span>{newentry.desc}</span>
          <br></br>
          <br></br>
          <div>
            <button className="p-3 border mr-3" onClick={() => setEdit(true)}>
              Edit
            </button>
            <button
              className="p-3 border mr-3"
              onClick={() => setCandelete(true)}
            >
              Delete
            </button>
          </div>
        </div>
      </td>
    </tr>
  );
};

export default DisplayEntry;
