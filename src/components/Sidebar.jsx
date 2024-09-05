import React from "react";
import { Link } from "react-router-dom";

const Sidebar = ({ sidebar }) => {
  const { logo, links, title, logoutTitle, logoutIcon } = sidebar;
  return (
    <div className="hidden md:flex md:flex-col md:justify-between md:w-[220px] px-5 py-5 h-screen sticky top-0">
      <div>
        <div className="flex flex-col items-start gap-5">
          <div className="flex items-center gap-2">
            <img src={logo} width={70} height={70} alt="Logo" />
          </div>

          <div className="flex flex-col items-start gap-4">
            {links.map((link, index) => (
              <Link to={link.path} key={index}>
                <ul className="flex items-center gap-4 cursor-pointer">
                  <img src={link.icon} alt={link.label} />
                  <p>{link.label}</p>
                </ul>
              </Link>
            ))}
          </div>
        </div>
      </div>
      <div>
        <div className="flex items-center gap-2 cursor-pointer">
          <img src={logoutIcon} width={24} height={24} alt="Logout Icon" />
          <p>{logoutTitle}</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
