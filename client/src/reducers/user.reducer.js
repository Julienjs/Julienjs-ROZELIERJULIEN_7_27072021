import { GET_USER } from "../actions/user.actions";

const initialState = {};
export default function userReducer(state = initialState, action) {
    switch (action.type) {
        case GET_USER:
            return action.payload;
        // case UPLOAD_IMAGE:
        //     return {
        //         ...state,
        //         imageUrlUser: action.payload,
        //     }
        // case UPDATE_PROFIL:
        //     return {
        //         ...state,
        //         description: action.payload,
        //     }
        default:
            return state
    }
};