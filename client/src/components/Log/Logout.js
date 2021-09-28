import React from 'react';

const Logout = () => {

    const Logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("id");
        window.location = "/";
    }

    return (
        <>
            <li onClick={Logout}>
                <p>Déconnexion</p>
            </li>
        </>
    )
};

export default Logout;