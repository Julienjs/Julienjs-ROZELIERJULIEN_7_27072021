import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateImgPost, updatePost } from '../../actions/post.action';
import { dateParser, isEmpty } from '../Utils';
import CardComment from './CardComment';
import DeleteCard from './DeletePost';
import avatar from '../../avatar/avatar.jpg';
import LikeButton from './LikeButton';
import Popup from '../Popup/Popup';
import ReactToolTip from 'react-tooltip'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'
toast.configure();

const CardAllPosts = ({ post }) => {
    const [isLoading, setIsLoading] = useState(true);
    // const [updateAllPost, setUpdateAllPost] = useState(false);
    const [textUpdate, setTextUdpate] = useState(null);
    const [showComment, setShowComment] = useState(false);
    const [image, setImage] = useState('');
    const [newImage, setNewImage] = useState(false);
    const [form, setForm] = useState(false);
    const [buttonPopup, setButtonPopup] = useState(false)
    const inputRef = useRef();
    const dispatch = useDispatch();

    const userData = useSelector((state) => state.userReducer);
    const usersData = useSelector((state) => state.usersReducer);

    const triggerFile = () => {
        inputRef.current.click();
        setForm(!form)
    }

    const handleupdatePost = () => {
        if (textUpdate) {
            dispatch(updatePost(post.id, textUpdate))
        }
        if (image) {
            dispatch(updateImgPost(post.id, image))
        }
        toast.success("Publication modifié !", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored"
        });
        setButtonPopup(false);

    }

    const handlePicture = (e) => {
        e.preventDefault();
        setNewImage(URL.createObjectURL(e.target.files[0]));
        setImage(e.target.files[0]);
    }

    const handleClosePicture = (e) => {
        setImage("");
        setNewImage("")
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
                                <img className="picture pictureUser-post"
                                    src={post.User.imageUrlUser === null ?
                                        (avatar)
                                        : (
                                            !isEmpty(usersData[0]) &&
                                            usersData.map((user) => {
                                                if (user.id === post.User.id)
                                                    return user.imageUrlUser;
                                                else return null;
                                            }).join('')
                                        )}
                                    alt="utilisateur img" />
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
                            <div className="container-editDelete-post">
                                {userData.isAdmin === true || userData.id === post.User.id ?
                                    <>
                                        <i className="far fa-edit" onClick={() => setButtonPopup(true)}></i>
                                        <DeleteCard id={post.id} />
                                    </>
                                    : null}
                            </div>
                        </div>
                        <p className="container-datePost">{dateParser(post.createdAt)}</p>
                        {/* {updateAllPost === false && */}
                        <div>
                            <p className="text-post">{post.message}</p>
                        </div>
                        {/* } */}
                        <div className="container-imgPost">
                            {post.imageUrlPost && (
                                <img className="img-post"
                                    src={newImage === false ?
                                        post.imageUrlPost
                                        : newImage
                                    }
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
                {showComment &&
                    <CardComment post={post} />
                }
            </article>
            <Popup trigger={buttonPopup} setTrigger={setButtonPopup}>
                <h1 className="popup-title">Modifier la publication</h1>
                <div className="border-bottom"></div>
                <div className="header-popup-newPost">
                    {userData.imageUrlUser === null ?
                        < img className="picture picture-newPost" src={avatar} alt="utilisateur img" />
                        : <img alt="utilisateur img" className="picture picture-newPost"
                            src={userData.imageUrlUser}
                        />
                    }
                    <h3>{userData.username}</h3>
                </div>
                <div className="textPopup">
                    {post.message ?
                        <textarea
                            onChange={(e) => setTextUdpate(e.target.value)}
                            defaultValue={post.message} />
                        :
                        <textarea
                            placeholder="De quoi souhaitez-vous parlez ?"
                            onChange={(e) => setTextUdpate(e.target.value)}
                        />
                    }
                    <div className="container-imgPost">
                        {image &&
                            <div className="btn-updatePicture">
                                <button
                                    className=" close-updateImg "
                                    onClick={triggerFile}
                                    onChange={handlePicture}
                                    data-tip="Modifier"
                                >
                                    <i className="far fa-image"
                                        style={{ color: "white" }}
                                    ></i>
                                </button>
                                <button
                                    className=" close-updateImg "
                                    onClick={handleClosePicture}
                                    data-tip="Supprimer"
                                >
                                    <i className="fas fa-times"
                                        style={{ color: "white" }}
                                    ></i>
                                </button>
                                <ReactToolTip
                                    place="bottom"
                                    type="info"
                                    effect="solid"
                                />
                            </div>}
                        {post.imageUrlPost || newImage ?
                            <img className="img-post-popup"
                                src={newImage === false ?
                                    post.imageUrlPost
                                    : newImage}
                                alt="post" />
                            : <div className="newPostPopup-img updatePostImg" >
                                <p>Ajouter une image</p>
                                <i class="far fa-images"
                                    onClick={triggerFile}
                                    onChange={handlePicture}>
                                </i>
                            </div>}
                        <form action="">
                            <label htmlFor="image" ></label>
                            <input type="file"
                                id="image"
                                name="image"
                                accept=".jpg, .jpeg, .png, .gif"
                                onChange={handlePicture}
                                ref={inputRef}
                                style={{ display: 'none' }} />
                        </form>
                    </div>
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
                    <button style={{ width: "320px" }} className="button green-button"
                        onClick={handleupdatePost}>
                        Valider modification
                    </button>
                </div>
            </Popup>
        </>
    )
};

export default CardAllPosts;