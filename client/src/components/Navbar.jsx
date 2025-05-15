import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { FaInstagram } from "react-icons/fa";
import { IconContext } from "react-icons";

import { AuthContext } from "@/context/authContext.jsx";

const Navbar = () => {
  const { currentUser, logout } = useContext(AuthContext);

  return (
    <div className="navbar">
      <div className="navbar-container">
        <div className="links">
          <div className="links-left">
            <Link className="link hvr-underline-from-left link1" to="/about">
              <h2>About</h2>
            </Link>
            <Link className="link hvr-underline-from-left link2" to="/2025">
              <h2>2025</h2>
            </Link>
          </div>
          <div className="logo">
            <Link to="/">
              <img
                src={
                  "https://res.cloudinary.com/difdjam1a/image/upload/v1744979141/logo_l87jlz.svg"
                }
                alt="logo"
              />
            </Link>
          </div>
          <div className="links-right">
            {currentUser && (
              <Link
                className="link hvr-underline-from-left-orange link4"
                to="/write"
              >
                <h2>Write</h2>
              </Link>
            )}
            {currentUser ? (
              <Link className="link hvr-underline-from-left-orange link5"
                    to="/"
              >
                <h2 onClick={logout}>Logout</h2>
              </Link>
            ) : (
              <Link
                className="link hvr-underline-from-left-orange link5"
                to="/login"
              >
                <h2>Login</h2>
              </Link>
            )}
            <div className="insta link">
              <IconContext.Provider value={{ className: "icon" }}>
                <a href={"https://www.instagram.com/rubymaghoney/"}>
                  <FaInstagram size={40} style={{ fill: "#863527" }} />
                </a>
              </IconContext.Provider>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
