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
          <Link className="link hvr-underline-from-left link1" to="/about">
            <h5>About</h5>
          </Link>
          <Link className="link hvr-underline-from-left link2" to="/2025">
            <h5>2025</h5>
          </Link>
          <div className="logo link3">
            <Link to="/">
              <img
                src={
                  "https://res.cloudinary.com/difdjam1a/image/upload/v1744979141/logo_l87jlz.svg"
                }
                alt="logo"
              />
            </Link>
          </div>
          <span className="admin">
            {currentUser && (
              <Link
                className="link hvr-underline-from-left-orange link5"
                to="/write"
              >
                <h6>Write</h6>
              </Link>
            )}
          </span>
          <span className="admin">
            <Link className="link hvr-underline-from-left-orange link4" to="/">
              {currentUser ? (
                <h6 onClick={logout}>Logout</h6>
              ) : (
                <Link
                  className="link hvr-underline-from-left-orange link4"
                  to="/login"
                >
                  <h6>Login</h6>
                </Link>
              )}
            </Link>
          </span>
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
  );
};

export default Navbar;
