import React, { useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { isEmpty } from '../Utils';
import { addPost, getAllPosts } from "../../actions/post.action";
import avatar from '../../avatar/avatar.jpg';
import Popup from '../Popup/Popup';
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'
toast.configure();



const NewPostForm = () => {
    const [message, setMessage] = useState("");
    const [postImg, setPostImg] = useState(null);
    const [image, setImage] = useState();
    const [video, setVideo] = useState("");
    const [buttonPopup, setButtonPopup] = useState(false)
    const userData = useSelector((state) => state.userReducer);
    const dispatch = useDispatch();
    const inputRef = useRef();

    const triggerFile = () => {
        inputRef.current.click();
    }

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
            setButtonPopup(false);
            setPostImg("");
            setVideo("");
            setMessage("");

            toast.success("Publication ajouté !", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored"
            });

        } else {
            alert("Veuillez entrer un message")
        }
    };

    return (
        <>
            <section className="section-newPost">
                <article className="article-newPost">
                    <Link to="/profil/">
                        <img className="picture picture-newPost" src={userData.imageUrlUser === null ?
                            (avatar)
                            : (userData.imageUrlUser)}
                            alt="utilisateur img" />
                    </Link>
                    <p className="newPublication" onClick={() => setButtonPopup(true)}>
                        Nouvelle publication ...
                    </p>
                </article>
            </section>

            <Popup trigger={buttonPopup} setTrigger={setButtonPopup}>
                <h1 className="popup-title">Créer une publication</h1>
                <div className="border-bottom"></div>
                <div className="header-popup-newPost">
                    {userData.imageUrlUser === null ?
                        < img className="picture" src={avatar} alt="utilisateur img" />
                        : <img alt="utilisateur img" className="picture"
                            src={userData.imageUrlUser}
                        />
                    }
                    <h3>{userData.username}</h3>
                </div>
                <div className="textPopup">
                    <textarea
                        placeholder="De quoi souhaitez-vous parlez ?"
                        onChange={(e) => setMessage(e.target.value)}
                    ></textarea>
                    {postImg && (
                        <>
                            <button
                                className="close-btn-img"
                                onClick={() => setPostImg("")}
                            >
                                <i className="fas fa-times"></i>
                            </button>
                            <img className="img-post-popup"
                                id="imgpost"
                                src={postImg}
                                alt="post img" />
                        </>
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
                                {postImg ?
                                    <p>Modifier l'image</p>
                                    : <p>Ajouter une image</p>
                                }
                                <i className="far fa-images"
                                    onClick={triggerFile}
                                    onChange={handlePicture}
                                >
                                </i>
                                <input type="file"
                                    name="image"
                                    accept=".jpg, .jpeg, .png, .gif"
                                    onChange={(e) => handlePicture(e)}
                                    ref={inputRef}
                                    style={{ display: 'none' }}
                                />
                            </div>
                        )}
                        <div className="container-newPostBtnSendCancel" >
                            <button
                                className={`button ${message || postImg || video.length > 20 ?
                                    "green-button"
                                    : "grey-button"}`}
                                onClick={handleNewPost}>
                                Publier
                            </button>
                        </div>
                    </div>
                </div>
            </Popup>
        </>
    )
};

export default NewPostForm;