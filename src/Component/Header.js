import React from "react";

const Header = (props) => {
  return (
    <div className="w-full h-[80px] z-8 bg-slate-300 drop-shadow-sm rounded mb-3">
      <div className="px-2 flex justify-between items-center  w-full h-full">
        <div className="flex items-center">
          <h2 className="text-4xl font-bold text-center text-gray-600">{props.title}</h2>
        </div>
      </div>
    </div>
  );
};

export default Header;
