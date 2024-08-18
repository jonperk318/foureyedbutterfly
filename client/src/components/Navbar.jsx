import React, {useContext} from 'react'
import {Link} from 'react-router-dom'
import { AuthContext } from '../context/authContext.jsx';
import Logo from "../img/logo.png"
import { FaInstagram } from "react-icons/fa";
import { IconContext } from "react-icons";

const Navbar = () => {

    const {currentUser, logout} = useContext(AuthContext);

    return (
        <div className="navbar">
            <div className="navbar-container">
                <div className="links">
                    <Link className="link hvr-underline-from-left link1" to="/about">
                        <h5>About</h5>
                    </Link>
                    <Link className="link hvr-underline-from-left link2" to="/2024">
                        <h5>2024</h5>
                    </Link>
                    <div className="logo link3">
                        <Link to="/">
                            <img src={Logo} alt="logo"/>
                        </Link>
                    </div>
                    <span className="admin">
                    {currentUser && (
                        <Link className="link hvr-underline-from-left-orange link5" to="/write">
                            <h6>Write</h6>
                        </Link>
                    )} 
                    </span>
                    <span className="admin">
                    <Link className="link hvr-underline-from-left-orange link4" to="/">
                    {currentUser ? ( <h6 onClick={logout}>Logout</h6> 
                    ) : ( <Link className="link hvr-underline-from-left-orange link4" to="/login"><h6>Login</h6></Link> )}
                    </Link>
                    </span>
                    <div className="insta link">
                        <IconContext.Provider value={{className: "icon"}}>
                            <a href={"https://www.instagram.com/foureyedbutterfly/?next=%2F"}>
                                <FaInstagram size={40} style={{fill: "#863527"}}/>
                            </a>
                        </IconContext.Provider>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Navbar