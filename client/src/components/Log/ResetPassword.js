import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'


export const ResetPassword = () => {
    const [newPassword, setNewPassword] = useState("");
    const [Controlpassword, setControlPassword] = useState('');
    const [confirmVisibility, setConfirmVisibility] = useState("false");
    const [newPasswordVisibility, setNewPasswordVisibility] = useState("false");
    const [username, setUsername] = useState("");

    const data = useParams();

    const changePassword = (e) => {
        e.preventDefault()

        if (newPassword !== Controlpassword) {
            toast.error("Les mots de passes ne correspondent pas", {
                position: "bottom-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored"
            });
        } else {
            axios({
                method: "put",
                url: `${process.env.REACT_APP_API_URL}api/auth/${data.id}/changePasswordViaEmail`,
                data: {
                    username: username,
                    password: newPassword
                },
                headers: {
                    'Authorization': `Bearer ${data.token}`
                }
            })
                .then((res) => {
                    toast.success(`${res.data.message}`, {
                        position: "bottom-center",
                        autoClose: 2000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "colored"
                    });
                    setNewPassword("")
                    setControlPassword("")
                    window.location = "/";
                })
                .catch((err) => {
                    for (let error of err.response.data.errors) {
                        toast.warn(error.msg, {
                            position: "bottom-center",
                            autoClose: 10000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "colored"
                        });
                    }
                });
        }
    }

    // v??rification du token envoy?? par mail
    useEffect(() => {
        axios({
            method: "get",
            url: `${process.env.REACT_APP_API_URL}api/auth/${data.id}/resetPassword/`,
            params: {
                resetPasswordToken: data.token
            }
        }).then((res) => {
            if (res.data.message === "Le lien de r??nitialisation est valide") {
                setUsername(res.data.username);
                toast.success(`Bonjour ${res.data.username}`, {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored"
                });
            } else {
                toast.warn(res.data, {
                    position: "bottom-center",
                    autoClose: 10000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored"
                });
            }
        })
            .catch((err) => console.log(err.data));
    }, [data.token, data.id])


    return (
        <div>
            <form id="changePassword">
                <h1>R??nitialisation du mot de passe</h1>
                <div className="login-borderBottom resetPassword-borderBottom"></div>
                <div className="container-inputPassword">
                    <input id="newPassword"
                        type={!newPasswordVisibility ? "text" : "password"}
                        placeholder="Nouveau mot de passe..."
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                    />
                    <p className="eye eyeSignUp">
                        {!newPasswordVisibility ?
                            <i className="far fa-eye-slash" onClick={() => setNewPasswordVisibility(true)}></i>
                            : <i className="far fa-eye" onClick={() => setNewPasswordVisibility(false)}></i>
                        }
                    </p>
                </div>
                <div className="container-inputPassword">
                    <input id="confirmPassword"
                        type={!confirmVisibility ? "text" : "password"}
                        name="password"
                        placeholder="Confirmer mot de passe"
                        onChange={(e) => setControlPassword(e.target.value)}
                        value={Controlpassword}
                    />
                    <p className="eye eyeSignUp">
                        {!confirmVisibility ?
                            <i className="far fa-eye-slash" onClick={() => setConfirmVisibility(true)}></i>
                            : <i className="far fa-eye" onClick={() => setConfirmVisibility(false)}></i>
                        }
                    </p>
                </div>
                <p className="errors confirmPassword"></p>
                <button className="button green-button"
                    onClick={changePassword}
                >Enregistrer</button>
                <Link to="/home/" style={{ textDecoration: 'none', color: 'white' }}>
                    <button className="button black-button">Retour</button>
                </Link>
            </form>
        </div>
    )
}
export default ResetPassword
