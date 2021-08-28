import React from 'react';
import { useSelector } from 'react-redux';
// import { uploadImg } from '../../actions/user.actions';

const UploadImg = () => {
    // const [file, setFile] = useState();
    // const dispatch = useDispatch();
    const userData = useSelector((state) => state.userReducer);


    // const ajouteruneImage = (e) => {
    //     e.preventDefault()
    //     const data = new FormData();
    //     data.append("name", userData.username);
    //     data.append("userId", userData.id)
    //     data.append("image", file);


    //     dispatch(uploadImg(data, userData.id))
    // };



    return (
        <form action="" className="ajouter-image form">
            <div className="cadre-photo">
                <img className=" photo photo-compte" src={userData.imageUrlUser} alt="" />
                <label htmlFor="image">
                    <i className="fas fa-camera">
                        <p>Modifier</p>
                    </i>
                </label>
                <input type="file" id="image" name="image" accept=".jpg, .jpeg, .png" className="input-file" />
                {/* */}

                {/* </input> */}
                <br />
                <input type="submit" value="Envoyer" />
            </div>
        </form>

    );
};

export default UploadImg;