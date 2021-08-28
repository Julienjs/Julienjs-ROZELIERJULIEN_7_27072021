// import axios from 'axios';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
// import { updateProfil } from '../../actions/user.actions';
import UploadImg from './uploadImg';




const MonProfil = () => {
    const userData = useSelector((state) => state.userReducer);
    // const [description, setDescription] = useState('');
    // // console.log(setDescription);
    // const [imageUrlUser, setImageUrlUser] = useState('');
    const [form, setForm] = useState(false);
    // const dispatch = useDispatch();

    // const modifierDescription = () => {
    //     dispatch(updateProfil(userData.id, description))
    //     setForm(false);
    // }

    // const modifierImage = (e) => {
    //     e.preventDefault();
    //     const data = new FormData();
    //     data.append('image', imageUrlUser);
    //     data.append("name", userData.username);
    //     data.append("userId", userData.id);
    //     dispatch(updateProfil(userData.id, imageUrlUser))
    //     // console.log(e.target.files);
    // }

    return (
        <main>
            <section className="profil-compte">
                <UploadImg />
                <h1 className="nom">{userData.username}</h1>
            </section>
            <section>
                <article className="article-compte">
                    {/* <label htmlFor="description"></label> */}
                    {form === false && (
                        <>
                            <div className="bloc-description">
                                <p onClick={() => setForm(!form)}>{userData.description}</p>
                                <div className="bouton-modifier-photo" >
                                    <i className="fas fa-pencil-alt"></i>
                                </div>
                            </div>
                            {/* <button className="button" onClick={() => setForm(!form)}>Modifer</button> */}
                        </>
                    )}
                    {form && (
                        <>
                            <textarea name="description" defaultValue={userData.description} id="descritpion" className="input textarea-description"
                                placeholder="Description..."></textarea>
                            <button className="button button-connexion">Valider modifications</button>
                        </>

                    )}
                    {/* <textarea name="descritpion" defaultValue={userData.description} id="descritpion" cols="30" rows="10" className="input textarea-description"
                            placeholder="Description..."></textarea> */}

                </article>
            </section>
        </main >
    )

};

export default MonProfil;
