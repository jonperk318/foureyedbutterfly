import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { FaInstagram } from "react-icons/fa";
import { IconContext } from "react-icons";
import { useState } from "react";
import { Squash as Hamburger } from "hamburger-react";

import { AuthContext } from "@/context/authContext.jsx";


const NavbarMobile = () => {

  const [isOpen, setOpen] = useState(false);
  const { currentUser, logout } = useContext(AuthContext);

  function toggleBurger() {
    setOpen(!isOpen);
  }

  function toggleBurgerLogo() {
    if (isOpen) {
      setOpen(false);
    } else {
      return;
    }
  }

  function logoutOnClick() {
    logout();
    toggleBurger();
  }

  return (
    <div className="navbar-mobile ">
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
      <div className="burger">
        <Hamburger toggled={isOpen} size={30} toggle={toggleBurger} />
      </div>
      {isOpen && (
        <div className="navbar-container-open">
          <div className="links">
            <Link className="link" to="/about" onClick={toggleBurger}>
              About
            </Link>
            <Link className="link " to="/2025" onClick={toggleBurger}>
              2025
            </Link>
            {currentUser && (
              <Link className="link" to="/write" onClick={toggleBurger}>
                Write
              </Link>
            )}
            {currentUser ? (
              <Link className="link" to="/" onClick={logoutOnClick}>
                Logout
              </Link>
            ) : (
              <Link className="link" to="/login" onClick={toggleBurger}>
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
