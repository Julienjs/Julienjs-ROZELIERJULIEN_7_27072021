import React, { useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllPosts, addComment } from '../../actions/post.action';
import { isEmpty } from '../Utils';
import EditDeleteComment from './EditDeleteComment';
import avatar from '../../avatar/avatar.jpg';



const CardComment = ({ post }) => {
    const [comment, setComment] = useState("");
    const [commentImg, setCommentImg] = useState(null);
    const [image, setImage] = useState();
    const userData = useSelector((state) => state.userReducer);
    const usersData = useSelector((state) => state.usersReducer);
    const inputRef = useRef();
    const dispatch = useDispatch();

    const triggerFile = () => {
        inputRef.current.click();
    }

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
        setImage('')
    }



    return (
        <>
            <article id="article-comment" >
                {post.Comments.map((comment) => {
                    return (
                        <div className="comments" key={comment.id}>
                            <div style={{ display: "flex", alignItems: "center" }}>
                                < img className="picture pictureUser-comment"
                                    src={userData.imageUrlUser === null ?
                                        (avatar)
                                        : (
                                            !isEmpty(usersData[0]) &&
                                            usersData.map((user) => {
                                                if (user.id === comment.userId)
                                                    return user.imageUrlUser;
                                                else return null;
                                            }).join('')
                                        )} alt="utilisateur img" />
                                <div className={`containerComment ${comment.userId === userData.id ?
                                    "containerComment-User" : "containerComment-client"}`}
                                >
                                    <h3 style={{ margin: "0" }}>{
                                        !isEmpty(usersData[0]) &&
                                        usersData.map((user) => {
                                            if (user.id === post.User.id)
                                                return user.username;
                                            else { return null; }
                                        }).join('')
                                    }
                                    </h3>
                                    <p className="text-comment">{comment.comment}</p>
                                </div>
                            </div>
                            {comment.imageUrl &&
                                < img className="picture-comment" src={comment.imageUrl} alt="comment img" />
                            }
                            <EditDeleteComment comment={comment} post={post.id} />
                        </div>
                    )
                })}
            </article>
            {userData.id && (
                <>
                    <div className="newComment">
                        <img className="picture pictureUser-comment"
                            src={userData.imageUrlUser === null ? (avatar) :
                                (userData.imageUrlUser)} alt="user" />
                        <div className="newComment-img-text">
                            <textarea id="textarea-comment" name="comment"
                                placeholder="Laisser un commentaire..."
                                onChange={(e) => setComment(e.target.value)}
                                value={comment}
                            />
                            <i className="far fa-image"
                                onClick={triggerFile}
                                onChange={handlePicture}>
                            </i>
                            <input type="file"
                                id="comment-file-upload"
                                name="image"
                                accept=".jpg, .jpeg, .png, .gif"
                                onChange={(e) => handlePicture(e)}
                                ref={inputRef}
                                style={{ display: 'none' }} />
                        </div>
                    </div>
                    {/* <div className="newComment-img">
                        
                    </div> */}
                    {commentImg && (
                        <div className="imgComment">
                            <button className="close close-commentImg" onClick={handleDeleteImg}>
                                <i className="fas fa-times"></i>
                            </button>
                            < img className=" picture-comment"
                                style={{ margin: "10px 0 0 0 " }}
                                src={commentImg}
                                alt="utilisateur img" />
                        </div>
                    )}
                    <button style={{ width: "100%" }}
                        className={`button ${comment || commentImg ? " SendComment-button" : "grey-button"}`}
                        onClick={handleComment}>
                        Envoyer
                    </button>
                </>
            )}



        </>
    )
};

export default CardComment;