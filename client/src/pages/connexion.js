import React from "react";
import Log from '../components/Log'




const Connexion = () => {
  return (
    <>
      {/* <header>
        <img src="logo/icon-left-font-monochrome-white.png" alt="logo de l'entreprise groupomania"
          className="logo-groupomania"></img>
      </header> */}
      <main id="main-connexion">

        <div id="Presentation">
          <img className="imgEntreprise" src="logo/imgentreprise.jpg" alt="bureau avec des ordinateurs"></img>
          <div className="cadre"></div>
          <h1 className="centrerPresentation">Bienvenue sur votre premier réseau social d'entreprise</h1>
        </div>
        <Log connexion={true} inscription={false} />

      </main>
      <footer>
        <p>Groupomania</p>
      </footer>
    </>
  )
};

export default Connexion;
