import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateImg } from '../../actions/user.action';
import avatar from '../../avatar/avatar.jpg';

const UpdateImg = () => {
    const userData = useSelector((state) => state.userReducer);
    const [image, setImage] = useState('');
    const [form, setForm] = useState(false);
    const [newImage, setNewImage] = useState(false);
    const dispatch = useDispatch();

    const handleUploadImage = () => {
        dispatch(updateImg(userData.id, image))
    };

    // const closeNewImg = (e) => {
    //     setForm(false)
    // }

    const handlePicture = (e) => {
        setNewImage(URL.createObjectURL(e.target.files[0]));
        setImage(e.target.files[0]);
    }

    return (
        <form action="" className="form-updatePicture" onSubmit={handleUploadImage}>
            <div className="container-userProfile-picture">
                <div className="container-account-picture">
                    {newImage === false ?
                        <img className="picture account-picture"
                            src={userData.imageUrlUser === null ?
                                (avatar) :
                                (userData.imageUrlUser)}
                            alt="utilisateur img" />
                        : <img className="picture account-picture" src={newImage} alt="utilisateur img" />
                    }
                </div>
                <h1> {userData.username}</h1>
                <label htmlFor="image">
                    {form === false && (
                        <div className="buttonChoice-picture">
                            <i className="fas fa-camera"></i>
                        </div>
                    )}
                </label>
                <input type="file"
                    id="image"
                    name="image"
                    accept=".jpg, .jpeg, .png"
                    className="input-file"
                    onChange={(e) => handlePicture(e)}
                    onClick={() => setForm(!form)} />
            </div>
            {form && (
                <input type="submit" value="Changer" className="sendUpdatePicture-user" />
            )}
        </form>
    );
};

export default UpdateImg;