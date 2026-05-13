import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:8000/api/user/login",
        formData,
      );

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("role", response.data.user.role);

      console.log(response.data);

      navigate("/feedback");
    } catch (error) {
      console.log(error.response?.data || error.message);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="w-[400px] px-6 py-10 shadow-lg rounded-lg border">
        <h1 className="text-3xl font-bold text-center mb-6">Login</h1>

        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <input
            type="text"
            className="border-2 p-3 rounded"
            placeholder="username"
            value={formData.username}
            onChange={(e) =>
              setFormData({
                ...formData,
                username: e.target.value,
              })
            }
          />

          <input
            type="password"
            className="border-2 p-3 rounded"
            placeholder="password"
            value={formData.password}
            onChange={(e) =>
              setFormData({
                ...formData,
                password: e.target.value,
              })
            }
          />

          <button
            type="submit"
            className="bg-black text-white p-3 rounded hover:bg-gray-800"
          >
            Log In
          </button>
          <p className="text-center mt-4">
            Already have an account?
            <Link to="/sign-up" className="text-blue-500 hover:underline">
              Sign-Up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
