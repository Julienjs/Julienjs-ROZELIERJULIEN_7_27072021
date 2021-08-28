import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteOnePost } from '../../actions/Post.action';
// import { deleteOnePost } from '../../actions/Post.action';



const DeleteCard = (props) => {
    const dispatch = useDispatch();

    const deleteQuote = (e) =>
        dispatch(deleteOnePost(props.id))

    return (
        <div onClick={() => {
            if (window.confirm('Voulez-vous supprimer cet article?')) {
                deleteQuote()
            };
        }}>
            <i className="far fa-trash-alt"></i>
        </div>
    );

};

export default DeleteCard;