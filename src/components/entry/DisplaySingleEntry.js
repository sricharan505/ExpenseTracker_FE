// Used to display Single Entry.

import { useState } from "react";
import DisplayEntry from "./DisplayEntry";
import EditEntry from "./EditEntry";

const DisplaySingleEntry = ({ entry }) => {
  const [clicked, setClicked] = useState(false);

  if (clicked) {
    return <DisplayEntry entry={entry} close={setClicked} />;
  }

  return (
    <tr onClick={() => setClicked(true)} style={{ cursor: "pointer" }}>
      <td>{entry.desc}</td>
      <td>{entry.date}</td>
      <td>{entry.value}</td>
    </tr>
  );
};

export default DisplaySingleEntry;
