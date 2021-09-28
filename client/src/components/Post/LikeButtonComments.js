// import React, { useState } from 'react';
// import { useDispatch } from 'react-redux';

// import { likeComment } from '../../actions/post.action';


// const LikeButtonComments = ({ comment }) => {
//     const [liked, setLiked] = useState([]);
//     const dispatch = useDispatch()

//     const like = () => {
//         dispatch(likeComment(comment.id))
//         if (liked.includes(comment.id)) {
//             setLiked(
//                 liked.filter((id) => {
//                     return id !== comment.id;
//                 })
//             );

//         } else {
//             setLiked([...liked, comment.id])
//         }
//     };

//     return (
//         <div>
//             <div>
//                 <p className="likePost">
//                     <i className={liked.includes(comment.id) ? "fas fa-heart heart-like" : "far fa-heart"} onClick={like} ></i>
//                     {comment.LikesComments.length}
//                 </p>
//             </div>
//         </div>
//     )
// };

// export default LikeButtonComments;
