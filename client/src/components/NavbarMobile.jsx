import React, {useContext} from 'react'
import {Link} from 'react-router-dom'
import { AuthContext } from '../context/authContext.jsx';
import Logo from "../img/logo.png"
import { FaInstagram } from "react-icons/fa";
import { IconContext } from "react-icons";
//import { useClickAway } from "react-use";
import { useState } from "react";
import { Squash as Hamburger } from "hamburger-react";

const NavbarMobile = () => {

    const [isOpen, setOpen] = useState(false);
    const {currentUser, logout} = useContext(AuthContext);

    function toggleBurger() {
        setOpen(!isOpen)
    }

    function toggleBurgerLogo() {
        if (isOpen) {
            setOpen(false)
        } else {
            return
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
                        <img src={Logo} alt="logo"/>
                    </Link>
                </div>
            </div>
            <div className="burger">
                <Hamburger toggled={isOpen} size={30} toggle={toggleBurger} />
            </div>
            {isOpen && (
                <div className="navbar-container-open">
                    <div className="links">
                        <Link className="link" to="/about" onClick={toggleBurger}>About</Link>
                        <Link className="link " to="/2024" onClick={toggleBurger}>2024</Link>
                        {currentUser && (<Link className="link" to="/write" onClick={toggleBurger}>Write</Link>)}
                        {currentUser ? (
                            <Link className="link" to="/" onClick={logoutOnClick}>Logout</Link> 
                        ) : ( 
                            <Link className="link" to="/login" onClick={toggleBurger}>Login</Link> 
                        )}
                        <div className="insta link">
                            <IconContext.Provider value={{className: "icon"}}>
                                <a href={"https://www.instagram.com/foureyedbutterfly/?next=%2F"}>
                                    <FaInstagram size={40} style={{fill: "#FA5537"}}/>
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