import React from "react";
const Header = () => {
  return (
    <nav className="flex items-center justify-between border mb-4 px-4 fixed top-0 w-full bg-gray-200">
      <img
        src="https://www.freepnglogos.com/uploads/train-png/train-png-clipart-best-web-clipart-4.png"
        alt="Train Image Logo"
        className="w-44 "
      />

      <div className=" w-full">
        <h1 class=" font-serif text-center text-3xl">
          Unstop Ticketing System{" "}
        </h1>
      </div>
    </nav>
  );
};

export default Header;
