import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteAccount, updateProfil } from '../../actions/user.action';
import UpdateImg from './UpdateImg';

const ProfileUser = () => {

    const userData = useSelector((state) => state.userReducer);
    const [description, setDescription] = useState('');
    const [confirmDelete, setConfirmDelete] = useState(false);
    const [form, setForm] = useState(false);
    const dispatch = useDispatch();

    const handleUpdateDescription = () => {
        dispatch(updateProfil(userData.id, description));
        setForm(false);
    }

    const handleDeleteAccount = () => {
        localStorage.clear();
        window.location.href = '/';
        dispatch(deleteAccount(userData.id));
    }

    return (
        <section>
            <article id="article-account-name-img">
                <UpdateImg />
                <div className="container-account-description">
                    {form === false && (
                        <div className="account-description">
                            <label htmlFor="description"></label>
                            <p onClick={() => setForm(!form)}>{userData.description} </p>
                        </div>
                    )}
                    {form && (
                        <>
                            <textarea name="description" id="description" placeholder="Description..."
                                defaultValue={userData.description}
                                onChange={(e) => setDescription(e.target.value)} >
                            </textarea>
                            <button className="button green-button buttonSend-description" onClick={handleUpdateDescription}>
                                Valider modifications
                            </button>
                        </>
                    )}
                    <p className="text-deleteAccount" onClick={() => setConfirmDelete(!confirmDelete)}>
                        Supprimer votre compte
                    </p>
                </div>
            </article>
            {confirmDelete &&
                <article className="article-popup  style-popup">
                    <div className="container-popup delete">
                        <h3>Voulez-vous supprimer votre compte ?</h3>
                        <div className="button-popupDelete">
                            <button className="button green-button"
                                onClick={() => setConfirmDelete(false)}>
                                Annuler
                            </button>
                            <button className="button red-button"
                                onClick={handleDeleteAccount}>
                                Confirmer
                            </button>
                        </div>
                    </div>
                </article>
            }
        </section >
    )
};

export default ProfileUser;