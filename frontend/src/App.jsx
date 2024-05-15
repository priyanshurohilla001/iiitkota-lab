import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { RecoilRoot } from "recoil";
import { Dashboard } from "./Pages/Dashboard";
import Signup from "./Pages/Signup";
import SignupVerificationPage from "./Pages/SignupVerificationPage";
import axios from "axios";
import { Homepage } from "./Pages/Homepage";
import { Login } from "./Pages/Login";
import { Testpage } from "./Pages/Testpage";
import { Header } from "./components/Header";
import { ForgotPassword } from "./Pages/ForgotPassword";

export default function App() {
  axios.defaults.headers.common["Authorization"] =
    `Bearer ${localStorage.getItem("token")}`;

  return (
    <RecoilRoot>
      <Header />
      <Router>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup/verify" element={<SignupVerificationPage />} />
          <Route path="/test" element={<Testpage />} />
          <Route path="*" element={<h1>Not Found</h1>} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
        </Routes>
      </Router>
    </RecoilRoot>
  );
}
