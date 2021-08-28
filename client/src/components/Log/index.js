import React, { useState } from 'react';
import Connexion from './connexion';
import Inscription from './inscription';



const Log = (props) => {
    const [inscriptionModal, setInscriptionModal] = useState(props.inscription);
    const [connexionModal, setConnexionModal] = useState(props.connexion);

    const afficherModel = (e) => {
        if (e.target.id === "inscription") {
            setConnexionModal(false);
            setInscriptionModal(true);
        } else if (e.target.id === "connexion") {
            setInscriptionModal(false);
            setConnexionModal(true);
        }
    }

    return (
        <div className="form-accueil">
            <div className="bouton-accueil">
                <button onClick={afficherModel} id="connexion" className="button bouton-lien bouton-lien-connexion">S'identifier</button>
                <button onClick={afficherModel} id="inscription" className="button bouton-lien bouton-lien-inscription">Créer un compte</button>
            </div>
            {connexionModal && <Connexion />}
            {inscriptionModal && <Inscription />}
        </div>
    );
};

export default Log;
