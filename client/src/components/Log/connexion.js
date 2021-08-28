import React, { useState } from 'react';
import axios from 'axios';




const Connexion = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const seConnecter = (e) => {
        e.preventDefault();
        const emailErreur = document.querySelector(".email");
        const passwordErreur = document.getElementsByClassName("password");

        axios({
            method: "post",
            url: `${process.env.REACT_APP_API_URL}api/auth/login`,
            data: {
                email,
                password
            }
        })
            .then((res) => {
                if (res.data.errors) {
                    console.log(res.data);
                    emailErreur.innerHTML = res.data.error.email;
                    passwordErreur.innerHTML = res.data.error.password;
                } else {

                    // window.localStorage.setItem('utilisateur', JSON.stringify(res.data));
                    window.localStorage.setItem('id', res.data.userId);
                    window.localStorage.setItem('token', res.data.token);
                    window.location = "/post";
                    // console.log(res);
                }
            })
            .catch((err) => console.log(err));
    }


    return (
        <div className="connexion">
            <form className="form" action="#" onSubmit={seConnecter} >
                <h2 className="titre-formulaire">Identifiez-vous</h2>
                <div className="bordure"></div>
                <label htmlFor="email"></label>
                <input value={email} onChange={(e) => setEmail(e.target.value)} id="email" className="input" type="email" name="email" placeholder="Adresse e-mail" />
                <div className="email erreur"></div>
                <br />
                <label htmlFor="password"></label>
                <input value={password} onChange={(e) => setPassword(e.target.value)} id="password" className="input" type="password" name="password" placeholder="Mot de passe" />
                <div className="password erreur"></div>
                <input id="connexion" type="submit" value="Connexion" className="button button-connexion" />
            </form>
        </div>
    )
};

export default Connexion;

