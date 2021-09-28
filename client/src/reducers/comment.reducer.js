// import { GET_ALL_COMMENTS, EDIT_COMMENT, DELETE_COMMENT, LIKE_COMMENT } from "../actions/comment.action";

// const initialState = {};

// export default function commentReducer(state = initialState, action) {
//     switch (action.type) {
//         case GET_ALL_COMMENTS:
//             return action.payload;
//         case EDIT_COMMENT:
//             return state.map((comment) => {
//                 if (comment.id === action.payload.commentId) {
//                     return {
//                         ...state,
//                         message: action.payload.message,
//                     };
//                 } else return state;
//             });
//         case DELETE_COMMENT:
//             return state.map((post) => {
//                 return {
//                     ...post,
//                     Comments: post.Comments.filter(
//                         (comment) => comment.id !== action.payload.commentId
//                     ),
//                 };
//             });
//         case LIKE_COMMENT:
//             return state.map((comment) => {
//                 if (comment.id === action.payload.CommenId) {
//                     if (action.payload.liked) {
//                         return {
//                             ...comment,
//                             Likes: [...comment.LikesComment, 0],
//                         }
//                     }
//                     else {
//                         const likesArray = comment.LikesComments;
//                         likesArray.pop();
//                         return { ...comment, Likes: likesArray }
//                     }
//                 } return comment
//             });
//         default:
//             return state;
//     }
// }