import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllPosts, addComment } from '../../actions/post.action';
import { isEmpty } from '../outils';
import EditDeleteComment from './EditDeleteComment';
import avatar from '../../avatar/avatar.jpg';



const CardComment = ({ post }) => {
    const [comment, setComment] = useState("");
    const [commentImg, setCommentImg] = useState(null);
    const [image, setImage] = useState();
    const userData = useSelector((state) => state.userReducer);
    const usersData = useSelector((state) => state.usersReducer);

    const dispatch = useDispatch();

    // const handleComment = (e) => {
    //     e.preventDefault()
    //     if (text) {
    //         dispatch(addComment(post.id, userData.id, text, userData.username))
    //             .then(() => dispatch(getAllPosts()))
    //             .then(() => setText(''));
    //     }
    // };

    const handleComment = async () => {
        if (comment || commentImg) {
            const data = new FormData();
            data.append('userId', userData.id);
            data.append('postId', post.id);
            data.append('comment', comment);
            if (image) data.append("image", image);
            await (dispatch(addComment(data, post.id)));
            dispatch(getAllPosts());
            setComment('');
            setCommentImg('');
            setImage('');
        }
    }

    const handlePicture = (e) => {
        setCommentImg(URL.createObjectURL(e.target.files[0]));
        setImage(e.target.files[0]);
    }

    const handleDeleteImg = () => {
        setCommentImg('');
    }



    return (
        <>
            <article id="article-comment" >
                {post.Comments.map((comment) => {
                    return (
                        <div className="container-comments" key={comment.id}>
                            <div className={comment.userId === userData.id ?
                                "containerComment-User" : "containerComment-client"}
                            >
                                <div className="profileUser-comment">
                                    <div className="userImgName-comment">
                                        < img className="picture pictureUser-comment" src={comment.User.imageUrlUser === null ?
                                            (avatar)
                                            : (
                                                !isEmpty(usersData[0]) &&
                                                usersData.map((user) => {
                                                    if (user.id === comment.userId) return user.imageUrlUser;
                                                    else return null;
                                                }).join('')
                                            )} alt="utilisateur img" />
                                        <h4>{comment.User.username}</h4>
                                    </div>
                                </div>
                                <p className="text-comment">{comment.comment}</p>
                            </div>
                            {/* <LikeButtonComments comment={comment} likesComment={comment.LikesComments} /> */}
                            <EditDeleteComment comment={comment} post={post.id} />
                            {comment.imageUrl &&
                                < img className=" picture-comment" src={comment.imageUrl} alt="comment img" />
                            }
                        </div>
                    )
                })}
            </article>
            {userData.id && (
                <>
                    <textarea id="textarea-comment" name="comment"
                        placeholder="Laisser un commentaire..."
                        onChange={(e) => setComment(e.target.value)}
                        value={comment}
                    ></textarea>
                    <div className="newComment-img">
                        <i className="far fa-image"></i>
                        <input type="file" id="comment-file-upload" name="image" accept=".jpg, .jpeg, .png, .gif" onChange={(e) => handlePicture(e)} />
                    </div>
                    {commentImg && (
                        <div className="imgComment">
                            <button className="close close-commentImg" onClick={handleDeleteImg}>X</button>
                            < img className=" picture-comment" src={commentImg} alt="utilisateur img" />
                        </div>
                    )}
                    <button className="button SendComment-button" onClick={handleComment}>envoyer</button>
                </>
            )}



        </>
    )
};

export default CardComment;