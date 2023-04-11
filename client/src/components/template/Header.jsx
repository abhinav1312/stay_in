import React, { useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "../../context/UserContext";
import {BrandLogo, ProfileIcon, SearchIcon } from "../../images/SVG";

const Header = () => {
  const { user } = useContext(UserContext);

  return (
    <>
      <header className="flex justify-between">
        <a href="/" className="flex items-center gap-2">
          {BrandLogo}
          <span className="font-bold text-xl">stayIn</span>
        </a>

        <div className="flex gap-2 border border-gray-300 rounded-full shadow-md py-2 px-4">
          <div>Anywhere</div>
          <div className="border-l border-gray-300"></div>
          <div>Any week</div>
          <div className="border-l border-gray-300"></div>
          <div>Add guests</div>
          <button className="bg-primary text-white p-1 rounded-full">
            {SearchIcon}
          </button>
        </div>

        {user ? (
          <Link to='/account' className="flex gap-2 items-center rounded-full border px-4 py-2">
            <div className="bg-gray-500 text-white rounded-full overflow-hidden">
              { ProfileIcon }
            </div>
            {user.name}
          </Link>
        ) : (
          <Link
            to="/login"
            className="flex item-center gap-2 border border-gray-300 rounded-full py-2 px-4"

          >
            Login / Signup
          </Link>
        )}
      </header>
    </>
  );
};

export default Header;
