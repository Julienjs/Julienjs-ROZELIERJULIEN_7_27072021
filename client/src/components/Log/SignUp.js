import React, { useState } from 'react';
import axios from 'axios';
import SignIn from './SignIn';

// !!!revoir if else ligne37 + fonction voir mot de passe

const SignUp = () => {
  const [formSubmit, setFormSubmit] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [Controlpassword, setControlPassword] = useState('');
  const [visibility, setVisibility] = useState("false");
  const [confirmVisibility, setConfirmVisibility] = useState("false");



  const handleRegister = async (e) => {
    e.preventDefault();
    const confirmPasswordError = document.querySelector('.confirmPassword');

    confirmPasswordError.innerHTML = " ";

    if (password !== Controlpassword) {
      confirmPasswordError.innerHTML = "Les mots de passes ne correspondent pas";
    } else {
      axios({
        method: "post",
        url: `${process.env.REACT_APP_API_URL}api/auth/signup`,
        data: {
          username: name,
          email,
          password
        }
      })
        .then((res) => {
          setFormSubmit(true)
        })
        .catch((err) => {
          for (let error of err.response.data.errors) {
            document.querySelector(`.errors.${error.param}`).innerHTML = error.msg;
          }
        });
    }
  };

  const visibilityPassword = () => {
    // let password = true;
    if (visibility) {
      document.getElementById("password").setAttribute("type", "text");
      setVisibility(false)
    } else {
      document.getElementById("password").setAttribute("type", "password");
      setVisibility(true)

    }
  }

  const visibilityConfirmPassword = () => {
    if (confirmVisibility) {
      document.getElementById("confirmPassword").setAttribute("type", "text");
      setConfirmVisibility(false)
    } else {
      document.getElementById("confirmPassword").setAttribute("type", "password");
      setConfirmVisibility(true)

    }
  }

  return (
    <div className="login">
      {formSubmit ? (
        <>
          <SignIn />
          <h4>
            Enregistrement réussi !
            <br />
            Veuillez vous connecté
          </h4>
        </>
      ) : (
        <form action="">
          <h2>Inscription</h2>
          <div className="login-borderBottom"></div>
          <div className=" error error-signUp password"></div>
          <div className=" error email"></div>
          <label htmlFor="username"></label>
          <input id="username" type="text" name="username" placeholder="Nom"
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
          <br />
          <label htmlFor="email"></label>
          <input id="email" type="email" name="email" placeholder="Adresse e-mail"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <br />
          <label htmlFor="password"></label>
          <div className="container-inputPassword">
            <input id="password" type="password" name="password" placeholder="Mot de passe"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
            <p className="eye eyeSignUp">
              {visibility === true ?
                <i className="far fa-eye-slash" onClick={visibilityPassword}></i>
                : <i className="far fa-eye" onClick={visibilityPassword}></i>
              }
            </p>
          </div>
          <br />
          <label htmlFor="password"></label>
          <div className="container-inputPassword">
            <input type="password" name="password" id="confirmPassword" placeholder="Confirmer mot de passe"
              onChange={(e) => setControlPassword(e.target.value)}
              value={Controlpassword}
            />
            <p className="eye eyeSignUpConfirm">
              {confirmVisibility === true ?
                <i className="far fa-eye-slash" onClick={visibilityConfirmPassword}></i>
                : <i className="far fa-eye" onClick={visibilityConfirmPassword}></i>
              }
            </p>
          </div>
          <div className="confirmPassword"></div>
          <button onClick={handleRegister} className="button green-button" >S'inscrire</button>
        </form>
      )}
    </div>
  )
};

export default SignUp;
