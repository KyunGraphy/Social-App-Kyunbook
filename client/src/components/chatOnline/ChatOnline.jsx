import React from 'react'
import "./chatOnline.css"

export default function ChatOnline() {
  return (
    <div className='chatOnline'>
      <div className='chatOnlineFriend'>
        <div className='chatOnlineImgContainer'>
          <img
            className='chatOnlineImg'
            src='https://images.pexels.com/photos/7671741/pexels-photo-7671741.jpeg?auto=compress&cs=tinysrgb&w=600'
            alt=''
          />
          <div className='chatOnlineBadge'></div>
        </div>
        <span className='chatOnlineName'>Kyun</span>
      </div>
    </div>
  )
}
