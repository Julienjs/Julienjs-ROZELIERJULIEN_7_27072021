import React from 'react';
import { NavLink } from 'react-router-dom';
import Deconnexion from './Log/deconnexion';

const Navbar = () => {
    const token = localStorage.getItem("token");
    // const uId = localStorage.getItem("utilisateur");

    return (
        <header>
            <NavLink exact to='/post'>
                <div className="header-logo">
                    <img src="logo/icon-left-font-monochrome-white.png"
                        alt="logo de l'entreprise groupomania" className="logo-groupomania" />
                </div>
            </NavLink>
            {token ? (
                <nav className="header-navigation">
                    <ul className="header-navigation-liste">
                        <li>
                            <NavLink exact to='/post'><i className="fas fa-home"></i></NavLink>
                        </li>
                        <li>
                            <NavLink exact to='/profil'><i className="fas fa-user"></i></NavLink>
                        </li>
                        <li>
                            <i className="fas fa-bell"></i>
                        </li>
                        <li>
                            <i className="fas fa-users"></i>
                        </li>
                        <Deconnexion />
                    </ul>
                </nav>
            ) : (
                <NavLink exact to='/'></NavLink>
            )}
        </header>
    )
};

export default Navbar;
