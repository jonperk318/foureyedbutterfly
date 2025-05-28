import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { FaInstagram } from "react-icons/fa";
import { IconContext } from "react-icons";
import { useState } from "react";

import { AuthContext } from "@/context/authContext.jsx";

const NavbarMobile = () => {
  const [isOpen, setOpen] = useState(false);
  const { currentUser, logout } = useContext(AuthContext);

  function toggleBurger() {
    setOpen(!isOpen);
    document.body.style.overflow = !isOpen ? "hidden" : "auto";
  }

  function toggleBurgerLogo() {
    isOpen && setOpen(false);
    document.body.style.overflow = !isOpen ? "hidden" : "auto";
  }

  function logoutOnClick() {
    logout();
    toggleBurger();
  }

  return (
    <div className="navbar-mobile ">
      <div className="menu">
        <svg
          className={"burger " + (isOpen && " active")}
          viewBox="0 0 100 100"
          width="75"
          toggled={isOpen.toString()}
          onClick={toggleBurger}
        >
          <a>
            <path
              className="line top"
              d="m 30,33 h 40 c 3.722839,0 7.5,3.126468 7.5,8.578427 0,5.451959 -2.727029,8.421573 -7.5,8.421573 h -20"
            />
            <path className="line middle" d="m 30,50 h 40" />
            <path
              className="line bottom"
              d="m 70,67 h -40 c 0,0 -7.5,-0.802118 -7.5,-8.365747 0,-7.563629 7.5,-8.634253 7.5,-8.634253 h 20"
            />
          </a>
        </svg>
      </div>
      <div className="navbar-container">
        <div className="logo link3">
          <Link to="/" onClick={toggleBurgerLogo}>
            <img
              src={
                "https://res.cloudinary.com/difdjam1a/image/upload/v1744979141/logo_l87jlz.svg"
              }
              alt="logo"
            />
          </Link>
        </div>
      </div>
      {isOpen && (
        <div className="navbar-container-open">
          <div className="links">
            <Link className="link link1" to="/about" onClick={toggleBurger}>
              About
            </Link>
            <Link className="link link2" to="/2025" onClick={toggleBurger}>
              2025
            </Link>
            {currentUser && (
              <Link className="link link3" to="/write" onClick={toggleBurger}>
                Write
              </Link>
            )}
            {currentUser ? (
              <Link className="link link4" to="/" onClick={logoutOnClick}>
                Logout
              </Link>
            ) : (
              <Link className="link link3" to="/login" onClick={toggleBurger}>
                Login
              </Link>
            )}
            <div className="insta link">
              <IconContext.Provider value={{ className: "icon" }}>
                <a href={"https://www.instagram.com/rubymaghoney/"}>
                  <FaInstagram size={40} style={{ fill: "#FA5537" }} />
                </a>
              </IconContext.Provider>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NavbarMobile;
