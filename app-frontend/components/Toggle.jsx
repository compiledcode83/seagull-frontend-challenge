import { useState, useEffect } from "react";

const Toggle = ({ setViewMode }) => {
  const [toggle, setToggle] = useState(true);
  const toggleClass = " transform translate-x-5";

  useEffect(() => setViewMode(toggle), [toggle]);

  return (
    <>
      <div className="flex justify-center items-center ">
        <p className="mr-5">Grid View</p>
        <div
          className="md:w-14 md:h-7 w-12 h-6 flex items-center bg-gray-400 rounded-full p-1 cursor-pointer"
          onClick={() => {
            setToggle(!toggle);
          }}
        >
          <div
            className={
              "bg-black md:w-6 md:h-6 h-5 w-5 rounded-full shadow-md transform duration-300 ease-in-out" +
              (toggle ? null : toggleClass)
            }
          ></div>
        </div>
        <p className="ml-5">Table View</p>
      </div>
    </>
  );
};

export default Toggle;
