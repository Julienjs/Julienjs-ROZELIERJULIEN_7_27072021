import axios from 'axios';

export const GET_ALL_POSTS = "GET_ALL_POSTS";
export const UPDATE_POST = "UPDATE_POST";
export const DELETE_POST = "DELETE_POST";

export const getAllPosts = (num) => {
    return (dispatch) => {
        return axios
            .get(`${process.env.REACT_APP_API_URL}api/post/`)
            .then((res) => {
                const array = res.data.posts.slice(0, num);
                // console.log(res.data.posts);
                dispatch({ type: GET_ALL_POSTS, payload: array })
            })
            .catch((err) => console.log(err));
    }
}


export const updatePost = (postId, message) => {
    return (dispatch) => {
        return axios({
            method: "put",
            url: (`${process.env.REACT_APP_API_URL}api/post/${postId}`),
            data: {
                message,

            }
        })
            .then((res) => {

                dispatch({ type: UPDATE_POST, payload: { message, postId } })
            })
            .catch((err) => console.log(err));
    };
};

export const deleteOnePost = (postId) => {
    return (dispatch) => {
        return axios({
            method: "delete",
            url: `${process.env.REACT_APP_API_URL}api/post/${postId}`
        })
            .then((res) => {
                dispatch({ type: DELETE_POST, payload: { postId } })
            })
            .catch((err) => console.log(err));
    };
};