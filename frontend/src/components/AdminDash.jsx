import { useState, useEffect } from "react";
import axios from "axios";

function AdminDash() {
  const [feedbacks, setFeedBacks] = useState([]);

  const [open, setOpen] = useState(false);
  const [editText, setEditText] = useState("");
  const [editId, setEditId] = useState(null);

  const token = localStorage.getItem("token");

  const fetchFeedbacks = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8000/api/user/feedback/admin",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setFeedBacks(res.data.data);
    } catch (error) {
      console.log(error.response.data);
    }
  };


  const openEditDialog = (item) => {
    setOpen(true);
    setEditId(item._id);
    setEditText(item.text);
  };


  const updateFeedback = async () => {
    try {
      await axios.put(
        `http://localhost:8000/api/user/feedback/update/${editId}`,
        {
          text: editText,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchFeedbacks();

      setOpen(false);
    } catch (error) {
      console.log(error.response.data);
    }
  };


  const deleteFeedback = async (id) => {
    try {
      await axios.delete(
        `http://localhost:8000/api/user/feedback/delete/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchFeedbacks();
    } catch (error) {
      console.log(error.response?.data);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchFeedbacks();
  }, []);

  return (
    <>
      <div>
        <h1 className="text-2xl font-bold mb-4">
          Admin Dashboard
        </h1>

        <div className="p-6">
          <div className="overflow-x-auto">
            <table className="w-full border border-gray-300">
              <thead className="bg-gray-400 text-white">
                <tr>
                  <th className="p-3 text-black">No</th>
                  <th className="p-3 text-black">
                    Username
                  </th>
                  <th className="p-3 text-black">
                    Feedback
                  </th>
                  <th className="p-3 text-black">
                    Date
                  </th>
                  <th className="p-3 text-black">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody>
                {feedbacks.map((item, index) => (
                  <tr
                    key={item._id}
                    className="border-b hover:bg-gray-100"
                  >
                    <td className="p-3">
                      {index + 1}
                    </td>

                    <td className="p-3 font-semibold">
                      {item.user?.username}
                    </td>

                    <td className="p-3">
                      {item.text}
                    </td>

                    <td className="p-3">
                      {new Date(
                        item.createdAt
                      ).toLocaleDateString()}
                    </td>

                    <td className="p-3 flex gap-2 justify-center">
                      <button
                        onClick={() =>
                          openEditDialog(item)
                        }
                        className="bg-blue-500 text-white px-4 py-1 rounded"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() =>
                          deleteFeedback(item._id)
                        }
                        className="bg-red-500 text-white px-4 py-1 rounded"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {open && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg w-[400px]">
            <h2 className="text-xl font-bold mb-4">
              Edit Feedback
            </h2>

            <textarea
              value={editText}
              onChange={(e) =>
                setEditText(e.target.value)
              }
              className="w-full border p-3 rounded mb-4"
            />

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setOpen(false)}
                className="bg-gray-400 text-white px-2 py-2 rounded"
              >
                Cancel
              </button>

              <button
                onClick={updateFeedback}
                className="bg-blue-500 text-white px-2 py-2 rounded"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default AdminDash;