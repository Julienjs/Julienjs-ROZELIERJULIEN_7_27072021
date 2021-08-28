
import axios from "axios";

export const GET_USERS = "GET_USERS";

export const getUsers = () => {
    return (dispatch) => {
        return axios
            .get(`${process.env.REACT_APP_API_URL}api/auth/`)
            .then((res) => {
                // console.log(res.data);
                dispatch({ type: GET_USERS, payload: res.data.users });
            })
            .catch((err) => console.log(err));
    };
};