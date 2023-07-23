import React, { useContext, useState } from 'react'
import axios from "axios";
import { CircularProgress } from '@material-ui/core';
import { AuthContext } from '../../context/AuthContext';

export default function Editted({ user }) {
  const [profileForm, setProfileForm] = useState({
    userId: user._id,
    username: user.username || "",
    desc: user.desc || "",
    city: user.city || "",
    from: user.from || "",
    relationship: user.relationship || "",
  })
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

  const handleChange = (e) => {
    setProfileForm((prev) => ({ ...prev, [e.target.id]: e.target.value }))
  }

  const submitHandler = async (e) => {
    setIsLoading(true);
    try {
      const res = await axios.put(`/users/${user._id}`,
        profileForm
      );
      dispatch({ type: "UPDATE", payload: res.data });
      window.location.reload();
    } catch (err) {
      console.log(err)
    }
    setIsLoading(false);
  };


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
      <div className="editInformation">
        <div className="profileEditField">
          <label htmlFor="username">User Name: </label>
          <input
            className="profileInput"
            type="text"
            id="username"
            placeholder={user.username ? user.username : "---"}
            autoComplete="off"
            spellCheck="false"
            value={profileForm.username}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className="profileEditField">
          <label htmlFor="desc">Description: </label>
          <input
            className="profileInput"
            type="text"
            id="desc"
            placeholder={user.desc ? user.desc : "---"}
            autoComplete="off"
            spellCheck="false"
            value={profileForm.desc}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className="profileEditField">
          <label htmlFor="city">City: </label>
          <input
            className="profileInput"
            type="text"
            id="city"
            placeholder={user.city ? user.city : "---"}
            autoComplete="off"
            spellCheck="false"
            value={profileForm.city}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className="profileEditField">
          <label htmlFor="from">From: </label>
          <input
            className="profileInput"
            type="text"
            id="from"
            placeholder={user.from ? user.from : "---"}
            autoComplete="off"
            spellCheck="false"
            value={profileForm.from}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className="profileEditField">
          <label htmlFor="relationship">Relationship: </label>
          <select
            className="profileInput"
            id="relationship"
            onChange={(e) => handleChange(e)}
          >
            <option selected value='' disabled>---</option>
            <option value="Single">Single</option>
            <option value="In relationship">In Relationship</option>
            <option value="Married">Married</option>
            <option value="Complicated">Complicated</option>
          </select>
        </div>
        <button
          className='updateProfileButton'
          onClick={submitHandler}
          disabled={isLoading}
        >
          {isLoading ? (
            <CircularProgress color="white" size="20px" />
          ) : (
            "Update Profile"
          )}
        </button>
      </div>
    </div>
  )
}
