import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updatePost } from '../../actions/Post.action';
import { dateParser, isEmpty } from '../outils';
import CardComment from './cardComment';
import DeleteCard from './deletePost';



const CardAllPosts = ({ post }) => {
    const [isLoading, setIsLoading] = useState(true);
    const userData = useSelector((state) => state.userReducer);
    const usersData = useSelector((state) => state.usersReducer);
    const [updateAllPost, setUpdateAllPost] = useState(false);
    const [textUpdate, setTextUdpate] = useState(null);
    const [showComment, setShowComment] = useState(false);
    // const [titreUpdate, setTitreUdpate] = useState(null);
    const dispatch = useDispatch();


    // console.log(post.Comments.comment);
    const updateMessage = () => {
        if (textUpdate) {
            dispatch(updatePost(post.id, textUpdate))
        }
        setUpdateAllPost(false);
    }

    useEffect(() => {
        !isEmpty(usersData[0]) && setIsLoading(false);
    }, [usersData])
    return (
        <>

            <article className="article-post" key={post.id}>
                {isLoading ? (
                    <i className="fas fa-spinner fa-spin"></i>
                ) : (
                    <>
                        <div className="header-post">
                            <div className="header-user-post">
                                <img className="photo photo-post" src={
                                    !isEmpty(usersData[0]) &&
                                    usersData.map((user) => {
                                        if (user.id === post.User.id) return user.imageUrlUser;

                                        else return null;
                                    }).join('')
                                }
                                    alt="de profil" />
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

                            {userData.id === post.User.id && (
                                <div className="button-modify-post">
                                    <DeleteCard id={post.id} />
                                    <div className="button-modifier-post" onClick={() => setUpdateAllPost(!updateAllPost)}>
                                        <i className="far fa-edit"></i>
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className="date-publication">
                            <p>{dateParser(post.createdAt)}</p>
                        </div>
                        {/* <!-- <button class="button-supprimer">X</button> --> */}
                        {updateAllPost === false &&
                            <div>
                                <h4>{post.titre}</h4>
                                <p>{post.message}</p>

                            </div>}
                        {post.imageUrlPost && (
                            <img className="img-post" src={post.imageUrlPost} alt="de la publication" />)}
                        <p className="video">
                            {
                                post.video && (
                                    <iframe
                                        width="500"
                                        height="300"
                                        src={post.video}
                                        frameBorder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                        title={post.id}
                                    ></iframe>
                                )}
                        </p>
                    </>
                )
                }

                <p className="bloc-commentaire">
                    <i className="far fa-comment"
                        onClick={() => setShowComment(!showComment)}
                    >{post.Comments.length}

                    </i>
                </p>
                {showComment && <CardComment post={post} />}

            </article>
            {updateAllPost && (
                <article className="article-post-popup style-popup">
                    <div className="bloc-popup">
                        <span className="close-popup"
                            onClick={() => setUpdateAllPost(false)}
                        >&#10005;</span>
                        <div className="header-post-popup">
                            <img alt="du post" src={post.imageUrlPost} className="img-post" />

                        </div>
                        <div className="updateMessage">
                            <textarea defaultValue={post.message}
                                onChange={(e) => setTextUdpate(e.target.value)}
                                className="input textarea-message"></textarea>
                            <input type="file" id="image" name="image" accept=".jpg, .jpeg, .png" />
                            <button className="button button-valid-update"
                                onClick={updateMessage}
                            >Valider modification</button>
                        </div>
                    </div>
                </article>
            )}
        </>

    )
};

export default CardAllPosts;