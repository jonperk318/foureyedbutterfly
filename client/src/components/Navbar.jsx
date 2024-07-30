import React from 'react'
import {Link} from 'react-router-dom'
import Logo from "../img/logo.png"
import { FaInstagram } from "react-icons/fa";

const Navbar = () => {
  return (
    <div className="navbar">
        <div className="container">
            <div className="links">
                <Link className="link hvr-underline-from-left" to="/?cat=about">
                    <h6>About</h6>
                </Link>
                <Link className="link hvr-underline-from-left" to="/?cat=2024">
                    <h6>2024</h6>
                </Link>
                <div className="logo">
                    <a href={"./"}>
                        <img src={Logo} alt="logo"/>
                    </a>
                </div>
                <span className="admin">
                <Link className="link hvr-underline-from-left" to="/">Logout</Link>
                </span>
                <span className="admin">
                <Link className="link hvr-underline-from-left" to="/write">Write</Link>
                </span>
                <div className="insta">
                    <a href={"https://www.instagram.com/foureyedbutterfly/?next=%2F"}>
                        <FaInstagram size={40} style={{fill: "#863527"}}/>
                    </a>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Navbar