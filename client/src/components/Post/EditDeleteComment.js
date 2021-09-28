import React, { useState, useEffect } from 'react';
// import { UidContext } from "../AppContext";
import { useSelector, useDispatch } from 'react-redux';
import { deleteComment, editComment } from '../../actions/post.action';
import { dateParser } from '../outils';



const EditDeleteComment = ({ comment, postId }) => {
    const [isAuthor, setIsAuthor] = useState(false);
    const [edit, setEdit] = useState(false);
    const [text, setText] = useState("");
    const dispatch = useDispatch();
    const userData = useSelector((state) => state.userReducer);


    const handleEdit = () => {

        if (text) {
            dispatch(editComment(comment.id, text))
            setText(" ")
            setEdit(false)
        }
    };

    const handleDelete = () => {
        dispatch(deleteComment(comment.id, postId));
    }

    useEffect(() => {
        const checkAuthor = () => {
            if (userData.id === comment.userId) {
                setIsAuthor(true);
            }
        };
        checkAuthor();
    }, [userData.id, comment.userId]);

    return (
        <div>
            <div className="editDelete-comment">
                <p className="date-comment">{dateParser(comment.createdAt)}</p>
                {isAuthor && edit === false && (
                    <div className="button-editDelete-comment">
                        <p onClick={() => setEdit(!edit)}>
                            Modifier
                        </p>
                        <p onClick={handleDelete}>Supprimer</p>
                    </div>
                )}
            </div>
            {isAuthor && edit && (
                <>
                    <textarea name="comment" id="textarea-comment"
                        onChange={(e) => setText(e.target.value)}
                        defaultValue={comment.comment}
                    />
                    <br />
                    <div className="container-EditClose-button">
                        <button className="button green-button button-EditCloseComment" onClick={handleEdit}>Envoyer</button>
                        <button className="button red-button button-EditCloseComment" onClick={() => setEdit(!edit)}>Annuler</button>
                    </div>
                </>
            )}
        </div>

    )
};

export default EditDeleteComment;