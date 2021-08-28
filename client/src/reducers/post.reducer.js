import { DELETE_POST, GET_ALL_POSTS, UPDATE_POST } from "../actions/Post.action";

const initialState = {};

export default function postReducer(state = initialState, action) {
    switch (action.type) {
        case GET_ALL_POSTS:
            return action.payload;
        case UPDATE_POST:
            return state.map((post) => {
                if (post.id === action.payload.postId) {

                    return {
                        ...post,
                        message: action.payload.message,
                        titre: action.payload.titre
                    };
                } else return post;
            });
        case DELETE_POST:
            return state.filter((post) => (post.id === action.payload.postId));
        default:
            return state;
    }
}