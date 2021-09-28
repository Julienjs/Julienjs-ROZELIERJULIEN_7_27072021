// import axios from 'axios';

// export const GET_ALL_COMMENTS = "GET_ALL_COMMENTS"
// export const ADD_COMMENT = "ADD_COMMENT";
// export const EDIT_COMMENT = "EDIT_COMMENT";
// export const DELETE_COMMENT = "DELETE_COMMENT";
// export const LIKE_COMMENT = "LIKE_COMMENT";


// export const getAllComments = (num, postId) => {
//     return (dispatch) => {
//         return axios
//             .get(`${process.env.REACT_APP_API_URL}api/comment/${postId}`)
//             .then((res) => {
//                 const array = res.data.comment.slice(0, num);
//                 // console.log(res.data.posts);
//                 dispatch({ type: GET_ALL_COMMENTS, payload: array })
//             })
//             .catch((err) => console.log(err));
//     }
// }

// export const addComment = (postId, commentId, comment, userComment) => {
//     const token = localStorage.getItem("token");
//     return (dispatch) => {
//         return axios({
//             method: "post",
//             url: `${process.env.REACT_APP_API_URL}api/comment/${postId}`,
//             headers: {
//                 'Authorization': `Bearer ${token}`
//             },
//             data: {
//                 commentId, comment, userComment
//             }
//         })
//             .then((res) => {
//                 dispatch({ type: ADD_COMMENT, payload: { commentId } })
//             })
//             .catch((err) => console.log(err));
//     };
// };

// export const editComment = (commentId, comment) => {
//     const token = localStorage.getItem("token");
//     return (dispatch) => {
//         return axios({
//             method: "put",
//             url: `${process.env.REACT_APP_API_URL}api/comment/${commentId}`,
//             headers: {
//                 'Authorization': `Bearer ${token}`
//             },
//             data: {
//                 comment
//             }
//         })
//             .then((res) => {
//                 // console.log(res);
//                 dispatch({ type: EDIT_COMMENT, payload: { comment, commentId } })
//             })
//             .catch((err) => console.log(err));
//     };
// };


// export const deleteComment = (commentId) => {
//     const token = localStorage.getItem("token");
//     return (dispatch) => {
//         return axios({
//             method: "delete",
//             url: `${process.env.REACT_APP_API_URL}api/comment/${commentId}`,
//             headers: {
//                 'Authorization': `Bearer ${token}`
//             },
//             data: { commentId },
//         })
//             .then((res) => {
//                 dispatch({ type: DELETE_COMMENT, payload: { commentId } });
//             })
//             .catch((err) => console.log(err));
//     };
// };
// export const likeComment = (commentId) => {
//     const token = localStorage.getItem("token");
//     return (dispatch) => {
//         return axios
//             .post(`${process.env.REACT_APP_API_URL}api/like/comment`,
//                 { CommentId: commentId },
//                 {
//                     headers: { 'Authorization': `Bearer ${token}` },
//                 }
//             ).then((res) => {
//                 dispatch({ type: LIKE_COMMENT, payload: { commentId, liked: res.data.liked, } })
//             })
//             .catch((err) => console.log(err));
//     }
// }