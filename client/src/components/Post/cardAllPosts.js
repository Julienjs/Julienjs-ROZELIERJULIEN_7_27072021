import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateImgPost, updatePost } from '../../actions/post.action';
import { dateParser, isEmpty } from '../outils';
import CardComment from './CardComment';
import DeleteCard from './DeletePost';
import avatar from '../../avatar/avatar.jpg';
import LikeButton from './LikeButton';
import { NavLink } from 'react-router-dom';




const CardAllPosts = ({ post }) => {
    const [isLoading, setIsLoading] = useState(true);
    const userData = useSelector((state) => state.userReducer);
    const usersData = useSelector((state) => state.usersReducer);
    const [updateAllPost, setUpdateAllPost] = useState(false);
    const [textUpdate, setTextUdpate] = useState(null);
    const [showComment, setShowComment] = useState(false);
    const [image, setImage] = useState('');
    const [newImage, setNewImage] = useState(false);
    const [form, setForm] = useState(false);
    const inputRef = useRef();
    const buttonDownload = useRef();
    const dispatch = useDispatch();

    const triggerFile = () => {
        inputRef.current.click();
        setForm(!form)
    }

    const download = () => { buttonDownload.current.click() }

    const updateMessage = () => {
        if (textUpdate) {
            dispatch(updatePost(post.id, textUpdate))
        }
        setUpdateAllPost(false);
    }

    const handleUploadImage = (e) => {
        if (image) {
            dispatch(updateImgPost(post.id, image))
        }
    };

    const handlePicture = (e) => {
        setNewImage(URL.createObjectURL(e.target.files[0]));
        setImage(e.target.files[0]);
    }

    useEffect(() => {
        !isEmpty(usersData[0]) && setIsLoading(false);
    }, [usersData]);

    return (
        <>
            <article className="article-post" key={post.id}>
                {isLoading ? (
                    <i className="fas fa-spinner fa-spin"></i>
                ) : (
                    <>
                        <div className="header-post">
                            <div className="header-post-user">
                                <NavLink exact to='/user'>
                                    <img className="picture pictureUser-post" src={post.User.imageUrlUser === null ?
                                        (avatar)
                                        : (
                                            !isEmpty(usersData[0]) &&
                                            usersData.map((user) => {
                                                if (user.id === post.User.id) return user.imageUrlUser;
                                                else return null;
                                            }).join('')
                                        )} alt="utilisateur img" />
                                </NavLink>
                                <h3>{
                                    !isEmpty(usersData[0]) &&
                                    usersData.map((user) => {
                                        if (user.id === post.User.id)
                                            return user.username;
                                        else { return null; }
                                    }).join('')
                                }
                                </h3>
                            </div>
                            {userData.isAdmin === true || userData.id === post.User.id ?
                                <div className="container-editDelete-post">
                                    {/* supprimer le post */}
                                    <DeleteCard id={post.id} />
                                    {/* modifier le message */}
                                    <i className="far fa-edit" onClick={() => setUpdateAllPost(!updateAllPost)}></i>
                                    {/* modifier l'image */}
                                    {form === false ?
                                        <i onClick={triggerFile} onChange={handlePicture} className="far fa-image"></i>
                                        : <i onClick={download} className="far fa-arrow-alt-circle-down"></i>
                                    }
                                    <form action="">
                                        <label htmlFor="image" ></label>
                                        <input type="file"
                                            id="image"
                                            name="image"
                                            accept=".jpg, .jpeg, .png, .gif"
                                            onChange={handlePicture}
                                            ref={inputRef}
                                            style={{ display: 'none' }} />
                                        {form && (
                                            <button style={{ display: 'none' }} ref={buttonDownload} onClick={handleUploadImage}></button>
                                        )}
                                    </form>
                                </div>
                                : null}
                        </div>
                        <p className="container-datePost">{dateParser(post.createdAt)}</p>
                        {updateAllPost === false &&
                            <div>
                                <p className="text-post">{post.message}</p>
                            </div>}
                        <div className="container-imgPost">
                            {post.imageUrlPost && (
                                <img className="img-post"
                                    src={newImage === false ?
                                        post.imageUrlPost
                                        : newImage}
                                    alt="post" />
                            )}
                        </div>
                        <p className="video">
                            {!post.imageUrlPost && post.video && (
                                <iframe
                                    width="500"
                                    height="300"
                                    src={post.video}
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                    title={post.id}
                                    ng-show="showvideo"
                                ></iframe>
                            )}
                        </p>
                    </>
                )
                }
                <div className="container-commentLike">
                    <p className="block-comments">
                        <i className="far fa-comment"
                            onClick={() => setShowComment(!showComment)}>
                        </i>
                        {post.Comments.length}
                    </p>
                    <LikeButton post={post} like={post.Likes} />
                </div>
                {showComment && <CardComment post={post} />}
            </article>
            {
                updateAllPost && (
                    <article className="article-popup  style-popup">
                        <div className="container-popup">
                            <span className="close close-popup"
                                onClick={() => setUpdateAllPost(false)}>
                                &#10005;
                            </span>
                            <div className="header-popup header-popup-edit-post">
                                {userData.imageUrlUser === null ?
                                    < img className="picture picture-newPost" src={avatar} alt="utilisateur img" />
                                    : <img alt="utilisateur img" className="picture picture-newPost"
                                        src={userData.imageUrlUser}
                                    />
                                }
                            </div>
                            <div className="textPopup">
                                <textarea defaultValue={post.message}
                                    onChange={(e) => setTextUdpate(e.target.value)}
                                ></textarea>
                                <p className="video">
                                    {post.video && (
                                        <iframe
                                            width="360"
                                            height="300"
                                            src={post.video}
                                            frameBorder="0"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            allowFullScreen
                                            title={post.id}
                                            ng-show="showvideo"
                                        ></iframe>
                                    )}
                                </p>
                                <button className="button green-button"
                                    onClick={updateMessage}>
                                    Valider modification
                                </button>
                            </div>
                        </div>
                    </article>
                )
            }
        </>
    )
};

export default CardAllPosts;