import React from 'react'
import {Link} from 'react-router-dom'
import Logo from "../img/logo.png"
import { FaInstagram } from "react-icons/fa";

//import { useClickAway } from "react-use";
import { useState } from "react";
import { Squash as Hamburger } from "hamburger-react";

const NavbarMobile = () => {

    const [isOpen, setOpen] = useState(false);

    return (
        <div className="navbar-mobile ">
            <Hamburger onToggle={toggled => {
                if (toggled) {
                    return (
                    <div className="navbar-container-open">
                        <div className="links">
                            <div className="logo">
                                <a href={"./"}>
                                    <img src={Logo} alt="logo"/>
                                </a>
                            </div>
                            <Link className="link" to="/?cat=about">About</Link>
                            <Link className="link " to="/?cat=2024">2024</Link>
                            <Link className="link" to="/">Logout</Link>
                            <Link className="link" to="/write">Write</Link>
                            <div className="insta link">
                                <a href={"https://www.instagram.com/foureyedbutterfly/?next=%2F"}>
                                    <FaInstagram size={40} style={{fill: "#FA5537"}}/>
                                </a>
                            </div>
                        </div>
                    </div>
                    )
                } else {
                    return (
                        <div className="navbar-container">
                            <div className="logo">
                                <a href={"./"}>
                                    <img src={Logo} alt="logo"/>
                                </a>
                            </div>
                        </div>
                    )
                }
            }} size={30} rounded/>
        </div>
    );
};

export default NavbarMobile;