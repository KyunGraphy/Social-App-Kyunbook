import React, { useEffect, useState } from 'react'
import "./chatOnline.css"
import axios from 'axios'

export default function ChatOnline({ onlineUsers, currentId, setCurrentChat }) {
  const [friends, setFriends] = useState([])
  const [onlineFriends, setOnlineFriends] = useState([])
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  useEffect(() => {
    const getFriends = async () => {
      const res = await axios(`/users/friends/${currentId}`)
      setFriends(res.data)
    }

    getFriends()
  }, [currentId])

  useEffect(() => {
    setOnlineFriends(friends.filter((friend) => onlineUsers.includes(friend._id)))
  }, [friends, onlineUsers])

  const handleClick = async (user) => {
    try {
      const res = await axios(`/conversations/find/${currentId}/${user._id}`)
      setCurrentChat(res.data)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className='chatOnline'>
      {friends.map(item => (
        <div
          key={item._id}
          className='chatOnlineFriend'
          onClick={() => handleClick(item)}
        >
          <div className='chatOnlineImgContainer'>
            <img
              className='chatOnlineImg'
              src={item?.profilePicture
                ? PF + item.profilePicture
                : PF + "person/noAvatar.png"
              }
              alt=''
            />
            {onlineFriends.includes(item) && <div className='chatOnlineBadge'></div>}
          </div>
          <span className='chatOnlineName'>{item?.username}</span>
        </div>
      ))}
    </div>
  )
}
