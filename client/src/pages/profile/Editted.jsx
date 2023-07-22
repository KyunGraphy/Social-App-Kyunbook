import React, { useContext, useState } from 'react'
import axios from "axios";
import { CircularProgress } from '@material-ui/core';
import { AuthContext } from '../../context/AuthContext';

export default function Editted({ user, setIsEditedPage }) {
  const [avatarImg, setAvatarImg] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { dispatch } = useContext(AuthContext)
  console.log(user)
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

  const UpdateProfile = () => {
    return (
      <>
        <div className="profileEditField">
          <label>User Name: </label>
          <input
            className="profileInput"
            type="text"
            placeholder={user.username ? user.username : "---"}
          />
        </div>
        <div className="profileEditField">
          <label>Description: </label>
          <input
            className="profileInput"
            type="text"
            placeholder={user.desc ? user.desc : "---"}
          />
        </div>
        <div className="profileEditField">
          <label>City: </label>
          <input
            className="profileInput"
            type="text"
            placeholder={user.city ? user.city : "---"}
          />
        </div>
        <div className="profileEditField">
          <label>From: </label>
          <input
            className="profileInput"
            type="text"
            placeholder={user.from ? user.from : "---"}
          />
        </div>
        <div className="profileEditField">
          <label>Relationship: </label>
          <input
            className="profileInput"
            type="text"
            placeholder={user.relationship ? user.relationship : "---"}
          />
        </div>
        <button
          className='updateProfileButton'
          onClick={null}
          disabled={isLoading}
        >
          {isLoading ? (
            <CircularProgress color="white" size="20px" />
          ) : (
            "Update Avatar"
          )}
        </button>
      </>
    )
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
              <span
                onClick={() => setAvatarImg("")}
                className='resetButton'
              >X</span>
              <img src={avatarImg} alt="" />
            </div>
          ) : (
            <p>Avatar image upload preview will appear here!</p>
          )}
        </div>
        {avatarImg && (
          <button
            className='updateProfileButton'
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
        <UpdateProfile />
      </div>
    </div>
  )
}
