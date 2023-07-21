import React, { useContext, useState } from 'react'
import axios from "axios";
import { CircularProgress } from '@material-ui/core';
import { AuthContext } from '../../context/AuthContext';

export default function Editted({ user, setIsEditedPage }) {
  const [avatarImg, setAvatarImg] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { dispatch } = useContext(AuthContext)

  const handleAvatarImageUpload = (e) => {
    const file = e.target.files[0];
    convertIntoBase64(file);
  };

  const convertIntoBase64 = (file) => {
    const reader = new FileReader();

    if (file) {
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setAvatarImg(reader.result);
      };
    } else {
      setAvatarImg("");
    }
  };

  const handleUploadAvatar = async () => {
    setIsLoading(true);
    try {
      const res = await axios.post(`/users/uploadAvatar/${user._id}`, { avatarImg });
      dispatch({ type: "UPDATE", payload: res.data.newUpdate });
      window.location.reload();
    } catch (err) {
      console.log(err)
    }
    setIsLoading(false);
  }

  return (
    <div className='editted'>
      <div className='editAvatar'>
        <input
          id="imgUpload"
          accept="image/*"
          type="file"
          onChange={handleAvatarImageUpload}
          required
        />
        <div className='avatarPreview'>
          {avatarImg ? (
            <div>
              <img src={avatarImg} alt="" />
            </div>
          ) : (
            <p>Avatar image upload preview will appear here!</p>
          )}
        </div>
        {avatarImg && (
          <button
            className='updateAvatarButton'
            onClick={handleUploadAvatar}
            disabled={isLoading}
          >
            {isLoading ? (
              <CircularProgress color="white" size="20px" />
            ) : (
              "Update Avatar"
            )}
          </button>
        )}
      </div>
      <div className='editInformation'>

      </div>
    </div>
  )
}
