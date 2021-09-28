import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { deletePost } from '../../actions/post.action';

const DeleteCard = (props) => {
    const dispatch = useDispatch();
    const [confirmDelete, setConfirmDelete] = useState(false);


    const deleteQuote = () =>
        dispatch(deletePost(props.id))

    return (
        <div className="container-deletePost" onClick={() => setConfirmDelete(!confirmDelete)}>
            <i className="far fa-trash-alt"></i>
            {confirmDelete &&
                <article className="article-popup  style-popup">
                    <div className="container-popup delete">
                        <h3>Voulez-vous supprimer ce post ?</h3>
                        <div className="button-popupDelete">
                            <button className="button green-button popupButton"
                                onClick={() => setConfirmDelete(false)}>
                                Annuler
                            </button>
                            <button className="button red-button popupButton"
                                onClick={deleteQuote}>
                                Confirmer
                            </button>
                        </div>
                    </div>
                </article>
            }
        </div>
    );

};

export default DeleteCard;