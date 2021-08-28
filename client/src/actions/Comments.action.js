// import axios from 'axios';


// export const GET_ALL_COMMENTS = "GET_ALL_COMMENTS";

// export const getAllComments = (num) => {
//     return (dispatch) => {
//         return axios
//             .get(`${process.env.REACT_APP_API_URL}api/comment/`)
//             .then((res) => {
//                 const array = res.data.posts.slice(0, num);
//                 // console.log(res.data.posts);
//                 dispatch({ type: GET_ALL_POSTS, payload: array })
//             })
//             .catch((err) => console.log(err));
//     }
// }