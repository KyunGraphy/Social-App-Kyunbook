import React, { useState } from 'react'

export default function Editted() {
  const [avatarImg, setAvatarImg] = useState("");

  const handleAvatarImageUpload = (e) => {
    const file = e.target.files[0];
    TransformFileData(file);
  };

  const TransformFileData = (file) => {
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
            <img src={avatarImg} alt="error!" />
          ) : (
            <p>Avatar image upload preview will appear here!</p>
          )}
        </div>
      </div>
      <div className='editInformation'>

      </div>
    </div>
  )
}
