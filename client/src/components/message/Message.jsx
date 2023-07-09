import React from 'react'
import { format } from "timeago.js"
import "./message.css"

export default function Message({ message, own }) {

  return (
    <div className={own ? 'message own' : 'message'}>
      <div className='messageTop'>
        {!own && <img
          className='messageImg'
          src='https://images.pexels.com/photos/7671741/pexels-photo-7671741.jpeg?auto=compress&cs=tinysrgb&w=600'
          alt=''
        />}
        <p className='messageText'>
          {message.text}
        </p>
      </div>
      <div className='messageBottom'>{format(message.createdAt)}</div>
    </div>
  )
}
