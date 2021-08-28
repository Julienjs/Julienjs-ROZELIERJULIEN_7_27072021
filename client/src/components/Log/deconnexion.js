import React from 'react';


const Deconnexion = () => {

    const deconnexion = () => {
        // localStorage.removeItem("utlisateur");
        localStorage.removeItem("token");
        localStorage.removeItem("id");
        window.location = "/";
    }

    return (
        <>
            <li onClick={deconnexion}>
                <i className="fas fa-power-off"></i>
            </li>
        </>
    )
};

export default Deconnexion;
