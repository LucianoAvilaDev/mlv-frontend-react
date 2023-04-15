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
    <>
      {label && (
        <label htmlFor="id" className={`text-gray-800 text-sm font-medium`}>
          {label}
        </label>
      )}
      <input
        key={id}
        id={id}
        type="text"
        className="rounded-md relative block w-full px-2 py-[0.5rem] border focus:border-2 focus:border-blue-500 border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none shadow-md focus:shadow-gray-500 focus:z-10 sm:text-sm"
        placeholder={placeholder}
        onChange={(e) => {
          setValue(e.target.value);
        }}
      />
      <button
        title={"Buscar"}
        className={`items-center flex justify-center p-1 text-sm font-medium shadow-gray-300 hover:shadow-gray-500 `}
        onClick={() => searchAction(value)}
      >
        <FaSearch />
      </button>
    </>
  );
};

export default InputTextSearch;
