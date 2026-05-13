import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function SignUp() {
  const navigate = useNavigate();
  const [fromData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:8000/api/user",
        fromData,
      );
      navigate("/login");
      console.log(response.data);
    } catch (error) {
      console.log(error.response.data );
    }
  };

  return (
    <>
      <div className="min-h-screen flex justify-center items-center">
        <div className="w-[400px] p-6 shadow-lg rounded-lg border">
          <h1 className="text-3xl font-bold text-center mb-6">Sign Up</h1>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="username"
              className="border-2 p-3 rounded"
              value={fromData.username}
              onChange={(e) =>
                setFormData({
                  ...fromData,
                  username: e.target.value,
                })
              }
            />

            <input
              type="email"
              placeholder="email"
              className="border-2 p-3 rounded"
              value={fromData.email}
              onChange={(e) =>
                setFormData({
                  ...fromData,
                  email: e.target.value,
                })
              }
            />

            <input
              type="password"
              placeholder="password"
              className="border-2 p-3 rounded"
              value={fromData.password}
              onChange={(e) =>
                setFormData({
                  ...fromData,
                  password: e.target.value,
                })
              }
            />

            <input
              type="password"
              placeholder="confirm password"
              className="border-2 p-3 rounded"
              value={fromData.confirmPassword}
              onChange={(e) =>
                setFormData({
                  ...fromData,
                  confirmPassword: e.target.value,
                })
              }
            />

            <button
              type="submit"
              className="bg-black text-white p-3 rounded hover:bg-gray-800"
            >
              Sign Up
            </button>
            <p className="text-center mt-4">
              Already have an account?
              <Link to="/login" className="text-blue-500 hover:underline">
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
}

export default SignUp;
