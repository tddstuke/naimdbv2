import React, { useState, useContext } from "react";
import logo from "../assets/logo.png";
import Auth from "../utils/auth";
import http from "../http-common";

const SignUp = () => {
  const [formState, setFormState] = useState({
    username: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setFormState({
      ...formState,
      [name]: value,
    });
    console.log(name, value);
  };

  const handleFormSubmit = async (e) => {
    console.log(formState);
    e.preventDefault();
    if (formState.password === formState.password_confirmation) {
      try {
        const data = await http.post("/users", formState);
        Auth.login(data.data.token);
        console.log(data.data.token);
      } catch (error) {
        console.log(error);
        alert(error.response.data.message);
      }
    } else {
      alert("Password must match Confirm Password");
    }

    e.target.reset();
  };

  return (
    <div className="flex flex-col items-center min-h-screen pt-6 sm:justify-center sm:pt-0 bg-gray-200">
      <div>
        <a href="/">
          <h3 className="text-4xl font-bold ">
            <img src={logo} className="h-10" />
          </h3>
        </a>
      </div>

      <form
        className="w-full px-6 py-4 mt-6 overflow-hidden bg-black shadow-md sm:max-w-md sm:rounded-lg"
        onSubmit={handleFormSubmit}
      >
        <div>
          <label
            htmlFor="username"
            className="block text-sm font-medium undefined text-white"
          >
            Username:
          </label>
          <div className="flex flex-col items-start text-white">
            <input
              type="text"
              name="username"
              //   value={formState.username}
              className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-1 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="mt-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-white undefined"
          >
            Email:
          </label>
          <div className="flex flex-col items-start">
            <input
              type="email"
              name="email"
              className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-1 px-4 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="mt-4">
          <label
            htmlFor="password"
            className="block text-sm font-medium undefined text-white"
          >
            Password:
          </label>
          <div className="flex flex-col items-start">
            <input
              type="password"
              name="password"
              //   value={formState.password}
              className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-1 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="mt-4">
          <label
            htmlFor="password_confirmation"
            className="block text-sm font-medium undefined text-white"
          >
            Confirm Password:
          </label>
          <div className="flex flex-col items-start">
            <input
              type="password"
              name="password_confirmation"
              className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-1 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="flex items-center justify-end mt-4">
          <a
            className="text-sm text-gray-600 underline hover:text-gray-900"
            href="/login"
          >
            Already registered?
          </a>
          <button
            type="submit"
            className="inline-flex items-center px-4 py-1 ml-4 tracking-widest text-white transition duration-150 ease-in-out bg-gray-600 border border-transparent rounded-md active:bg-gray-900 false"
          >
            Sign Up
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
