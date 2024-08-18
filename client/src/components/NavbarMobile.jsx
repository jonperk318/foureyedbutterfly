import React, {useContext} from 'react'
import {Link} from 'react-router-dom'
import { AuthContext } from '../context/authContext.jsx';
import Logo from "../img/logo.png"
import { FaInstagram } from "react-icons/fa";

//import { useClickAway } from "react-use";
import { useState } from "react";
import { Squash as Hamburger } from "hamburger-react";

const NavbarMobile = () => {

    const [isOpen, setOpen] = useState(false);
    const {currentUser, logout} = useContext(AuthContext);

    return (
        <div className="navbar-mobile ">
            <div className="navbar-container">
                <div className="logo link3">
                    <Link to="/">
                        <img src={Logo} alt="logo"/>
                    </Link>
                </div>
            </div>
            <Hamburger toggled={isOpen} size={30} toggle={setOpen} className="burger"/>
            {isOpen && (
                <div className="navbar-container-open">
                    <div className="links">
                        <Link className="link" to="/about">About</Link>
                        <Link className="link " to="/2024">2024</Link>
                        {currentUser && (<Link className="link" to="/write">Write</Link>)}
                        {currentUser ? (
                            <Link className="link" to="/" onClick={logout}>Logout</Link> 
                        ) : ( 
                            <Link className="link" to="/login">Login</Link> 
                        )}
                        <div className="insta link">
                            <a href={"https://www.instagram.com/foureyedbutterfly/?next=%2F"}>
                                <FaInstagram size={40} style={{fill: "#FA5537"}}/>
                            </a>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default NavbarMobile;