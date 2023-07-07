import React from 'react'
import "./message.css"

export default function Message({ own }) {
  return (
    <div className={own ? 'message own' : 'message'}>
      <div className='messageTop'>
        {!own && <img
          className='messageImg'
          src='https://images.pexels.com/photos/7671741/pexels-photo-7671741.jpeg?auto=compress&cs=tinysrgb&w=600'
          alt=''
        />}
        <p className='messageText'>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </p>
      </div>
      <div className='messageBottom'>1 hour ago</div>
    </div>
  )
}
