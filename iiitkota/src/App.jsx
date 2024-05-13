import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { RecoilRoot } from "recoil";
import { useState } from "react";

import { Dashboard } from "./Pages/Dashboard";
import Signup from "./Pages/Signup";
import SignupVerificationPage from "./Pages/SignupVerificationPage";
import axios from "axios";
import { Homepage } from "./Pages/Homepage";
import { Login } from "./Pages/Login";
import { Testpage } from "./Pages/Testpage";

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
        </Routes>
      </Router>
      <div className="bg-primary py-2 text-white flex justify-center">
        made with ❤️ by Priyanshu
      </div>
    </RecoilRoot>
  );
}

const Header = () => {
  const [isNavVisible, setNavVisible] = useState(false);

  const token = localStorage.getItem("token");

  const toggleNav = () => {
    setNavVisible(!isNavVisible);
  };

  return (
    <div className="">
      <nav className="flex items-center justify-between flex-wrap bg-primary p-6 md:px-12 fixed w-full z-10 top-0">
        <div className="flex items-center flex-shrink-0 text-white mr-6">
          <a
            className="text-white no-underline hover:text-white hover:no-underline"
            href="/"
          >
            <img src="/logo.svg" className="h-10" />
          </a>
        </div>

        <div className="block lg:hidden">
          <button
            onClick={toggleNav}
            className="flex items-center px-3 py-2 border rounded text-gray-500 border-gray-600 hover:text-white hover:border-white"
          >
            <svg
              className="fill-current h-3 w-3"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>Menu</title>
              <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
            </svg>
          </button>
        </div>

        <div
          className={`w-full flex-grow lg:flex lg:items-center lg:w-auto ${isNavVisible ? "" : "hidden"} pt-6 lg:pt-0`}
          id="nav-content"
        >
          <ul className="list-reset lg:flex justify-end flex-1 items-center">
            <li className="mr-3">
              <a
                className="inline-block py-2 px-4 text-white no-underline"
                href="/"
              >
                Home
              </a>
            </li>
            <li className="mr-3">
              <a
                className="inline-block py-2 px-4 text-gray-300 hover:text-gray-200 no-underline"
                href="/#courses"
              >
                Courses
              </a>
            </li>
            <li className="mr-3">
              <a
                className="inline-block text-gray-300 no-underline hover:text-gray-200 hover:text-underline py-2 px-4"
                href="/#clubs"
              >
                Clubs
              </a>
            </li>
            <li className="mr-3">
              <a
                className="inline-block text-gray-300 no-underline hover:text-gray-200 hover:text-underline py-2 px-4"
                href="/#placement"
              >
                Placement Stats
              </a>
            </li>
            <li className="mr-3">
              <a
                className="inline-block text-gray-300 no-underline hover:text-gray-200 hover:text-underline py-2 px-4"
                href="/#director"
              >
                About Us
              </a>
            </li>
            <li className="mr-3">
              {token ? (
                <>
                  <button
                    className="mt-4 lg:mt-0 text-white border-2 border-white mr-2 px-6 py-2 rounded-sm  hover:scale-110 transition ease-in-out duration-300"
                    onClick={() => {
                      window.location.href = "/dashboard";
                    }}
                  >
                    dashboard
                  </button>
                  <a href="/login">
                    <button
                      className="mt-4 lg:mt-0 bg-white px-6 py-2 rounded-sm  hover:scale-110 transition ease-in-out duration-300"
                      onClick={() => {
                        localStorage.removeItem("token");
                        window.location.reload();
                      }}
                    >
                      logout
                    </button>
                  </a>
                </>
              ) : (
                <a href="/login">
                  <button
                    className="mt-4 lg:mt-0 bg-white px-6 py-2 rounded-sm  hover:scale-110 transition ease-in-out duration-300"
                    href="/login"
                  >
                    login
                  </button>
                </a>
              )}
            </li>
          </ul>
        </div>
      </nav>

      <div className="pt-24"></div>
    </div>
  );
};
