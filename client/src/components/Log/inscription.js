import React, { useState } from 'react';
import axios from 'axios';
import Connexion from './connexion';

const Inscription = () => {
  const [formSubmit, setFormSubmit] = useState(false);
  const [nom, setNom] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [Controlpassword, setControlPassword] = useState('');

  const senregistrer = async (e) => {
    e.preventDefault();
    // const nomErreur = document.querySelector('.nom.erreur');
    // const emailErreur = document.querySelector('.email.erreur');
    // const passwordErreur = document.querySelector('.password.erreur');
    const confirmPasswordErreur = document.querySelector('.confirmPassword.erreur');

    confirmPasswordErreur.innerHTML = " ";

    if (password !== Controlpassword) {
      confirmPasswordErreur.innerHTML = "Les mots de passes ne correspondent pas";
    } else {
      axios({
        method: "post",
        url: `${process.env.REACT_APP_API_URL}api/auth/signup`,
        data: {
          username: nom,
          email,
          password
        }
      })
        .then((res) => {

          if (res.data.errors) {
            // nomErreur.innerHTML = res.data.errors.username;
            // emailErreur.innerHTML = res.data.errors.email;
            // passwordErreur.innerHTML = res.data.errors.password;
          } else {
            setFormSubmit(true);
          }
        })
        .catch((err) => {
          for (let error of err.response.data.errors) {
            document.querySelector(`.erreur.${error.param}`).innerHTML = error.msg;
          }
          console.log(err.response.data);
        });
    }
  };

  return (
    <div className="connexion inscription">
      {formSubmit ? (
        <>
          <Connexion />
          <h4 className="msg-validation">
            Enregistrement réussi ! <br />Veuillez vous connecté
          </h4>
        </>
      ) : (
        <form onSubmit={senregistrer} className="form" action="">
          <h2 className="titre-formulaire">Inscription</h2>
          <div className="bordure"></div>
          <label htmlFor="username"></label>
          <input id="username" className="input" type="text" name="username" placeholder="Nom" onChange={(e) => setNom(e.target.value)} value={nom} />
          <br />
          <label htmlFor="email"></label>
          <input id="email" className="input" type="email" name="email" placeholder="Adresse e-mail" onChange={(e) => setEmail(e.target.value)} value={email} />
          <br />
          <label htmlFor="password"></label>
          <input id="password" className="input" type="password" name="password" placeholder="Mot de passe" onChange={(e) => setPassword(e.target.value)} value={password} />
          <div className="password erreur"></div>
          <br />
          <label htmlFor="password"></label>
          <input className="input" type="password" name="password" placeholder="Confirmer mot de passe" onChange={(e) => setControlPassword(e.target.value)} value={Controlpassword} />
          <div className="confirmPassword erreur"></div>
          <input type="submit" value="S'inscrire" className="button button-inscription" />
        </form>
      )}
    </div>
  )
};

export default Inscription;
