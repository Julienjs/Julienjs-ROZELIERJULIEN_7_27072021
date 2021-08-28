import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { isEmpty } from '../outils';




const CardComment = ({ post }) => {
    const [texeComment, setTextComment] = useState("")
    const userData = useSelector((state) => state.userReducer);
    const usersData = useSelector((state) => state.usersReducer);
    const dispatch = useDispatch();

    const sendComment = () => {

    }



    return (
        <>
            <div>
                {post.Comments.map((comment) => {
                    for (let comment of post.Comments) {
                        console.log(comment);
                    }
                    return (
                        <div className={comment.userId === userData.id ?
                            "comment-User" : "comment-client"} key={comment._id}>
                            <img className="photo-comment" src={
                                !isEmpty(usersData[0]) &&
                                usersData.map((user) => {
                                    if (user.id === comment.userId) return user.imageUrlUser;
                                    else return null;
                                }).join('')
                            } alt="profil">
                            </img>
                            <p>{comment.comment}</p>
                        </div>

                    )
                })}

            </div>
            {/* <form action="commentaire">
                <textarea id="form-commentaire" class="input" name="commentaire"
                    placeholder="Commenter..."></textarea>
                <input type="submit" value="Envoyer" class="button button-commentaire" />
            </form> */}
        </>
    )
};

export default CardComment;