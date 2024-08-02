import React from 'react'
import {Link} from 'react-router-dom'
import Logo from "../img/logo.png"
import { FaInstagram } from "react-icons/fa";

//import { useClickAway } from "react-use";
//import { useRef } from "react";
import { useState } from "react";
import { Squash as Hamburger } from "hamburger-react";
//import { AnimatePresence, motion } from "framer-motion";

const NavbarMobile = () => {

    const [isOpen, setOpen] = useState(false);

    return (
        <div className="navbar-mobile ">
            <div className="navbar-container">
                <Hamburger toggled={isOpen} size={30} toggle={setOpen}/>
                {isOpen && (
                    <div className="links">
                        <Link className="link hvr-underline-from-left link1" to="/?cat=about">
                            <h6>About</h6>
                        </Link>
                        <Link className="link hvr-underline-from-left link2" to="/?cat=2024">
                            <h6>2024</h6>
                        </Link>
                        <span className="admin">
                            <Link className="link hvr-underline-from-left link4" to="/">Logout</Link>
                        </span>
                        <span className="admin">
                            <Link className="link hvr-underline-from-left link5" to="/write">Write</Link>
                        </span>
                        <div className="insta link">
                            <a href={"https://www.instagram.com/foureyedbutterfly/?next=%2F"}>
                                <FaInstagram size={40} style={{fill: "#863527"}}/>
                            </a>
                        </div>
                    </div>
                )}
                <div className="logo link3">
                    <a href={"./"}>
                        <img src={Logo} alt="logo"/>
                    </a>
                </div>
            </div>
        </div>
    );
};

export default NavbarMobile;