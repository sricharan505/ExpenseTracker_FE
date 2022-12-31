import { useSelector } from "react-redux";
import Error from "../pages/error";

const DeleteEntry = ({ id, close, setIsdeleted }) => {
  const { authtoken, expense, income, investment } = useSelector(
    (state) => state.user
  );

  const handleDelete = async () => {
    const deleteentryquery = {
      query: `
                        mutation
                        {
                            deleteEntry(id:"${id}")
                        }
                        
                    `,
    };

    let res;

    try {
      res = await fetch(process.env.REACT_APP_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + authtoken,
        },
        body: JSON.stringify(deleteentryquery),
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

    if (res.data.deleteEntry) {
      console.log("deleted successfully");
      setIsdeleted(true);
      close(false);
    }
  };

  return (
    <tr>
      <td>
        <div className="absolute inset-1/4 bg-gray-500">
          <div>
            <span>Are you sure that you want to delete this?</span>
            <br></br>
            <button onClick={handleDelete} className="p-2 m-2 border">
              Delete
            </button>
            <button onClick={() => close(false)} className="p-2 m-2 border">
              Cancel
            </button>
          </div>
        </div>
      </td>
    </tr>
  );
};

export default DeleteEntry;
