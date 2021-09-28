import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { isEmpty } from '../outils';
import { addPost, getAllPosts } from "../../actions/post.action";
import avatar from '../../avatar/avatar.jpg';



const NewPostForm = () => {
    const [message, setMessage] = useState("");
    const [postImg, setPostImg] = useState(null);
    const [image, setImage] = useState();
    const [video, setVideo] = useState("");
    const [newPost, setNewPost] = useState(false)
    const userData = useSelector((state) => state.userReducer);
    const dispatch = useDispatch();


    const handleVideo = () => {
        let findLink = message.split(" ");
        for (let i = 0; i < findLink.length; i++) {
            if (findLink[i].includes('https://')) {
                let embed = findLink[i].replace('watch?v=', "embed/");
                setVideo(embed.split('&')[0]);
                findLink.splice(i, 1);
                setMessage(findLink.join(" "));
                setPostImg('');
            }
        }
    }
    handleVideo();

    const handlePicture = (e) => {
        setPostImg(URL.createObjectURL(e.target.files[0]));
        setImage(e.target.files[0]);
        setVideo('');
    }

    const handleNewPost = async () => {
        if (message || postImg || video) {
            const data = new FormData();
            data.append('userId', userData.id);
            data.append('message', message);
            if (image) data.append("image", image);
            data.append('video', video)

            await (dispatch(addPost(data)));
            dispatch(getAllPosts());
            cancelPost();
            setNewPost(false);

        } else {
            alert("Veuillez entrer un message")
        }

    };


    const cancelPost = () => {
        setMessage('');
        setPostImg('');
        setVideo('');
        setImage('');

    }


    return (
        <>
            <section className="section-newPost">
                <article className="article-newPost">
                    <NavLink exact to="/profil/">
                        <img className="picture picture-newPost" src={userData.imageUrlUser === null ?
                            (avatar)
                            : (userData.imageUrlUser)}
                            alt="utilisateur img" />
                    </NavLink>
                    <input name='message'
                        placeholder='Nouvelle publication ...'
                        onClick={() => setNewPost(!newPost)}
                    ></input>
                </article>
            </section>

            {newPost && (
                <section>
                    <article className="article-popup style-popup article-newPost-popup">
                        <div className="container-popup">
                            <span className="close close-popup"
                                onClick={() => setNewPost(false)}>
                                &#10005;
                            </span>
                            <div className="header-popup header-popup-newPost">
                                {userData.imageUrlUser === null ?
                                    < img className="picture picture-newPost" src={avatar} alt="utilisateur img" />
                                    : <img alt="utilisateur img" className="picture picture-newPost"
                                        src={userData.imageUrlUser}
                                    />
                                }
                                <h3>{userData.username}</h3>
                            </div>
                            <div className="textPopup">
                                <textarea
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                ></textarea>
                                {postImg && (
                                    <img className="img-newPost-popup" src={postImg} alt="post img" />
                                )}
                                <div id="containerVideo-Newpost">
                                    {video && (
                                        <div id="closeVideo-nexPost">
                                            <span
                                                onClick={() => setVideo("")}>
                                                &#10005;
                                            </span>
                                        </div>
                                    )}
                                    {video && (
                                        <iframe
                                            className="video-newPost"
                                            src={video}
                                            frameBorder="0"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            allowFullScreen
                                            title={video}
                                        ></iframe>
                                    )}
                                </div>
                                <div className="container-newPostPopup-img-btn">
                                    {isEmpty(video) && (
                                        <div className="newPostPopup-img">
                                            <i className="far fa-image"></i>
                                            <input type="file" id="newPost-file-upload" name="image" accept=".jpg, .jpeg, .png, .gif" onChange={(e) => handlePicture(e)} />
                                        </div>
                                    )}
                                    <div className="container-newPostBtnSendCancel">
                                        {message || postImg || video.length > 20 ? (
                                            <button className="button btnNewPost red-button"
                                                onClick={cancelPost}>
                                                Annuler
                                            </button>
                                        ) : null}
                                        <button className="  button btnNewPost green-button"
                                            onClick={handleNewPost}>
                                            Publier
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </article>
                </section>
            )
            }
        </>
    )
};

export default NewPostForm;