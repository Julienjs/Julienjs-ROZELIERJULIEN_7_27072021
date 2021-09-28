import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import Logout from './Log/Logout';

const Navbar = () => {
    const [showLinks, setShowLinks] = useState(false);
    const token = localStorage.getItem("token");
    const userData = useSelector((state) => state.userReducer);

    const handleShowLinks = () => {
        setShowLinks(!showLinks)
    }
    return (
        <header className={!token && ("headerLogin")}>
            <NavLink exact to='/post'>
                <div className="header-container-img">
                    <img src="logo/icon-left-font-monochrome-white.png"
                        alt="logo de l'entreprise groupomania"
                        className="header-img-groupomania" />
                </div>
            </NavLink>
            {
                token ? (
                    <nav className={`navbar ${showLinks ? "show-nav" : "hide-nav"}`}>
                        <ul className="nav-links">
                            <li>
                                <NavLink onClick={() => setShowLinks(!showLinks)} style={{ textDecoration: 'none', color: 'white' }} exact to='/post'><p>Accueil</p></NavLink>
                            </li>
                            <li>
                                <NavLink onClick={() => setShowLinks(!showLinks)} style={{ textDecoration: 'none', color: 'white' }} exact to='/profil'><p>Profil</p></NavLink>
                            </li>
                            <li>
                                <p>Notifications</p>
                            </li>
                            {userData.isAdmin === true && (
                                <li>
                                    <i className="fas fa-users"></i>
                                </li>
                            )}
                            <Logout />
                        </ul>
                        <button className="navbar-burger" onClick={handleShowLinks}>
                            <span className="burger-bar"></span>
                        </button>
                    </nav>
                ) : (
                    <NavLink exact to='/'></NavLink>
                )
            }
        </header >
    )
};

export default Navbar;
