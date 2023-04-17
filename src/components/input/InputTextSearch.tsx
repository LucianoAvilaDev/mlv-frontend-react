import { useState } from "react";
import { FaSearch } from "react-icons/fa";

type props = {
  id: string;
  placeholder: string;
  label: string;
  searchAction: (value: string) => void;
};

const InputTextSearch = ({ id, label, placeholder, searchAction }: props) => {
  const [value, setValue] = useState("");

  return (
    <div className="flex w-full items-center justify-center">
      <div className="flex space-x-4 w-full">
        {label && (
          <label htmlFor="id" className={`text-gray-800 text-sm font-medium`}>
            {label}
          </label>
        )}
        <input
          key={id}
          id={id}
          type="text"
          className="rounded-md relative block w-full px-2 py-[0.5rem] border focus:border-2 focus:border-themeMedium border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none shadow-md focus:shadow-gray-500 focus:z-10 "
          placeholder={placeholder}
          onChange={async (e) => {
            await Promise.resolve(setValue(e.target.value));
          }}
        />
        <button
          title={"Buscar"}
          className={`items-center flex hover:bg-themeLighter
          active:bg-transparent
          hover:text-themeDarker
          active:text-themeTextLight justify-center p-2 rounded-md text-2xl text-themeTextLight font-medium shadow-gray-300 hover:shadow-gray-500 `}
          onClick={() => searchAction(value)}
        >
          <FaSearch />
        </button>
      </div>
    </div>
  );
};

export default InputTextSearch;
