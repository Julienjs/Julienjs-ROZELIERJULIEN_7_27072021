import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { likePost } from '../../actions/post.action';




const LikeButton = ({ post }) => {
    const [liked, setLiked] = useState([]);
    const dispatch = useDispatch();


    const like = () => {
        dispatch(likePost(post.id))
        if (liked.includes(post.id)) {
            setLiked(
                liked.filter((id) => {
                    return id !== post.id;
                })
            );
        } else {
            setLiked([...liked, post.id])
        }
    };


    return (
        <div>
            <div>
                <p className="likePost">
                    <i className="far fa-heart"
                        onClick={like}></i>
                    {post.Likes.length}
                </p>
            </div>
        </div>
    )
};

export default LikeButton;
