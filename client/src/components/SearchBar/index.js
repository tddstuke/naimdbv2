import React from "react";

const SearchBar = () => {
  return (
    <div className=" flex flex-col justify-center items-center bg-black">
      <form className="w-full max-w-lg">
        <div className="md:flex md:items-center mb-6">
          <div className="md:w-1/3">
            <label className="block text-white md:text-right mb-1 md:mb-0 pr-4 ">
              Enter Movie Title:
            </label>
          </div>
          <div className="md:w-2/3">
            <input
              className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-1 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
              id="inline-full-name"
              type="text"
              placeholder="Movie Title"
            />
          </div>
          <button
            class="px-4 py-2 text-white bg-gray-600 rounded-md shadow hover:bg-gray-800 md:mt-0 mt-2 md:ml-2 md:mt-0 mt-2 md:w-1/5 w-full"
            type="button"
          >
            Search
          </button>
        </div>
      </form>
      <form className="w-full max-w-lg">
        <div className="md:flex md:items-center mb-6">
          <div className="md:w-1/3">
            <label className="block text-white md:text-right mb-1 md:mb-0 pr-4">
              Enter Show Title:
            </label>
          </div>
          <div className="md:w-2/3">
            <input
              className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-1 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
              id="inline-full-name"
              type="text"
              placeholder="Show Title"
            />
          </div>
          <button
            class="px-4 py-2 text-white bg-gray-600 rounded-md shadow hover:bg-gray-800 md:ml-2 md:mt-0 mt-2 md:w-1/5 w-full"
            type="button"
          >
            Search
          </button>
        </div>
      </form>
    </div>
  );
};

export default SearchBar;
