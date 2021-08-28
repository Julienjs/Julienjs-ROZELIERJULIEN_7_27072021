import axios from "axios";




export const GET_USER = "GET_USER";
// export const UPLOAD_PICTURE = "UPLOAD_PICTURE"
// export const UPDATE_PROFIL = "UPDATE_PROFIL";
// export const UPLOAD_IMAGE = "UPDATE_IMAGE";

export const getUser = (uid) => {
    return (dispatch) => {
        return axios
            .get(`${process.env.REACT_APP_API_URL}api/auth/${uid}`)
            .then((res) => {
                // console.log(res);
                for (let element of res.data.userId) {
                    // console.log(uid);
                    dispatch({ type: GET_USER, payload: element })
                }
            })
            .catch((err) => console.log(err));
    };
};





