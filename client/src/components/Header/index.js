import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";
import Auth from "../../utils/auth";
import http from "../../http-common";

function NavBar() {
  const [navbar, setNavbar] = useState(false);
  const [userId, setUserId] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    // const getUser = async () => {
    if (Auth.loggedIn()) {
      setEmail(Auth.getProfile().data.email);
      getUser(Auth.getProfile().data.email);
    }
  }, []);

  async function getUser(email) {
    const idData = await http.get(`/users/${email}`);
    // console.log(idData);
    setUserId(idData.data);
  }

  return (
    <nav className="w-full bg-black shadow">
      <div className=" justify-between px-4 mx-auto md:items-center md:flex md:px-8">
        <div>
          <div className="flex items-center justify-between py-3 md:py-5 md:block">
            <a href="/">
              <img src={logo} alt="NAIMDB logo" className="h-10" />
            </a>
            <div className="md:hidden">
              <button
                className="p-2 text-gray-700 rounded-md outline-none focus:border-gray-400 focus:border"
                onClick={() => setNavbar(!navbar)}
              >
                {navbar ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6 text-white"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
        <div>
          <div
            className={`flex-1 justify-self-center pb-3 mt-8 md:block md:pb-0 md:mt-0 ${
              navbar ? "block" : "hidden"
            }`}
          >
            <ul className="items-center justify-center space-y-8 md:flex md:space-x-6 md:space-y-0">
              <li className="text-white hover:text-indigo-200">
                <a href="/">Home</a>
              </li>
              {Auth.loggedIn() && (
                <li className="text-white hover:text-indigo-200">
                  <Link to={`/dashboard/${userId}`}>Dashboard</Link>
                </li>
              )}
              <li className="text-white hover:text-indigo-200">
                <a href="/aboutus">About US</a>
              </li>
              <li className="text-white hover:text-indigo-200">
                <a href="/contactus">Contact US</a>
              </li>
            </ul>

            <div className="mt-3 space-y-2 md:hidden ">
              {Auth.loggedIn() ? (
                <Link
                  to="/"
                  onClick={Auth.logout}
                  className="inline-block w-full px-4 py-2 text-center text-white bg-gray-600 rounded-md shadow hover:bg-gray-800"
                >
                  Sign out
                </Link>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="inline-block w-full px-4 py-2 text-center text-white bg-gray-600 rounded-md shadow hover:bg-gray-800"
                  >
                    Sign in
                  </Link>
                  <Link
                    to="/signup"
                    className="inline-block w-full px-4 py-2 text-center text-white bg-gray-600 rounded-md shadow hover:bg-gray-800"
                  >
                    Sign up
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
        <div className="hidden space-x-2 md:inline-block">
          {Auth.loggedIn() ? (
            <Link
              to="/"
              onClick={Auth.logout}
              className="px-4 py-2 text-white bg-gray-600 rounded-md shadow hover:bg-gray-800"
            >
              Sign out
            </Link>
          ) : (
            <>
              <Link
                to="/login"
                className="px-4 py-2 text-white bg-gray-600 rounded-md shadow hover:bg-gray-800"
              >
                Sign in
              </Link>
              <Link
                to="/signup"
                className="px-4 py-2 text-white bg-gray-600 rounded-md shadow hover:bg-gray-800"
              >
                Sign up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
