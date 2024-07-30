import React from 'react'
import {Link} from 'react-router-dom'
import Logo from "../img/logo.png"
import { FaInstagram } from "react-icons/fa";

const Navbar = () => {
  return (
    <div className="navbar">
        <div className="container">
            <div className="links">
                <Link className="link" to="/?cat=about">
                    <h6>About</h6>
                </Link>
                <Link className="link" to="/?cat=2024">
                    <h6>2024</h6>
                </Link>
                <div className="logo">
                    <a href={"./"}>
                        <img src={Logo} alt="logo"/>
                    </a>
                </div>
                <div className="insta">
                    <FaInstagram/>
                </div>
                <span>Logout</span>
                <span className="write">
                <Link className="link hvr-underline-from-left" to="/write">Write</Link>
            </span>
            </div>
        </div>
    </div>
  )
}

export default Navbar