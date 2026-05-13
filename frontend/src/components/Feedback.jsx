import axios from "axios";
import { useEffect, useState } from "react";

function Feedback() {
  const [feedbacks, setFeedBacks] = useState([]);

  const [formData, setFormData] = useState({
    text: "",
  });
  
  const [open, setOpen] = useState(false);
  const [editText, setEditText] = useState("");
  const [editId, setEditId] = useState(null);

  const token = localStorage.getItem("token");

  const fetchFeedbacks = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/user/feedback", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setFeedBacks(res.data.data);
    } catch (error) {
      console.log(error.response?.data || error.message);
    }
  };

  const addFeedback = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:8000/api/user/feedback", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      fetchFeedbacks();

      setFormData({
        text: "",
      });
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
      await axios.patch(
        `http://localhost:8000/api/user/feedback/${editId}`,
        {
          text: editText,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      fetchFeedbacks();

      setOpen(false);
    } catch (error) {
      console.log(error.response?.data || error.message);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchFeedbacks();
  }, []);

  return (
    <>
      {/* Add Form */}
      <div className="flex justify-center mt-6">
        <form onSubmit={addFeedback} className="flex flex-col gap-4 w-[500px]">
          <textarea
            placeholder="Enter feedback"
            value={formData.text}
            onChange={(e) =>
              setFormData({
                ...formData,
                text: e.target.value,
              })
            }
            className="border p-3 rounded"
          />

          <button className="bg-black text-white p-2 rounded">
            Add Feedback
          </button>
        </form>
      </div>

      {/* Table */}
      <div className="p-6">
        <table className="w-full border border-gray-300">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="p-3">No</th>
              <th className="p-3">Feedback</th>
              <th className="p-3">Date</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>

          <tbody>
            {feedbacks.map((item, index) => (
              <tr key={item._id} className="border-b hover:bg-gray-100">
                <td className="p-3">{index + 1}</td>

                <td className="p-3">{item.text}</td>

                <td className="p-3">
                  {new Date(item.createdAt).toLocaleDateString()}
                </td>

                <td className="p-3 flex justify-center gap-2">
                  <button
                    onClick={() => openEditDialog(item)}
                    className="bg-blue-500 text-white px-4 py-1 rounded"
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {open && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg w-[400px]">
            <h2 className="text-xl font-bold mb-4">Edit Feedback</h2>

            <textarea
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
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

export default Feedback;
