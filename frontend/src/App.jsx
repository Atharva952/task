import { Route, Routes } from "react-router-dom";

import SignUp from "./components/SignUp";
import Login from "./components/Login";
import Feedback from "./components/Feedback";
import AdminDash from "./components/AdminDash";

import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Routes>
      <Route path="/" element={<SignUp />} />
      <Route path="/sign-up" element={<SignUp />} />
      <Route path="/login" element={<Login />} />
      <Route
        path="/feedback"
        element={
          <ProtectedRoute>
            <Feedback />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin"
        element={
          <ProtectedRoute adminOnly={true}>
            <AdminDash />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
