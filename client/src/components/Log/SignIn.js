import React, { useState } from 'react';
import axios from 'axios';

// !!!revoir les erreurs+ fonction voir mot de passe


const SignIn = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [visibility, setVisibility] = useState("false");

    const handleSignIn = (e) => {
        e.preventDefault();

        axios({
            method: "post",
            url: `${process.env.REACT_APP_API_URL}api/auth/login`,
            data: {
                email,
                password
            }
        })
            .then((res) => {
                window.localStorage.setItem('id', res.data.userId);
                window.localStorage.setItem('token', res.data.token);
                window.location = "/post";
            })
            .catch((err) => {
                console.log(err.response.data);
                document.querySelector(`.error`).innerHTML = err.response.data.error;

            });

    }

    const visibilityPassword = () => {
        if (visibility) {
            document.getElementById("password").setAttribute("type", "text");
            setVisibility(false)
        } else {
            document.getElementById("password").setAttribute("type", "password");
            setVisibility(true)
        }
    }

    return (
        <div className="login">
            <form action="#" >
                <h2>Identifiez-vous</h2>
                <div className="login-borderBottom"></div>
                <div className="error"></div>
                <label htmlFor="email"></label>
                <input id="email" type="email" name="email" placeholder="Adresse e-mail"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <br />
                <label htmlFor="password"></label>
                <div className="container-inputPassword">
                    <input id="password" type="password" name="password" placeholder="Mot de passe"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <p className="eye eyeSignIn">
                        {visibility === true ?
                            <i className="far fa-eye-slash" onClick={visibilityPassword}></i>
                            : <i className="far fa-eye" onClick={visibilityPassword}></i>
                        }
                    </p>
                </div>
                <button id="login" className="button green-button" onClick={handleSignIn}>Connexion</button>
            </form>
        </div>
    )
};

export default SignIn;

