import React, { useContext, useEffect, useState } from 'react'
import "./messenger.css"
import Topbar from "../../components/topbar/Topbar"
import Conversation from '../../components/conversation/Conversation'
import Message from '../../components/message/Message'
import ChatOnline from '../../components/chatOnline/ChatOnline'
import { AuthContext } from '../../context/AuthContext'
import axios from 'axios'

export default function Messenger() {
  const [conversations, setConversations] = useState([])
  const { user } = useContext(AuthContext)

  useEffect(() => {
    const getConversations = async () => {
      try {
        const res = await axios(`/conversations/${user._id}`)
        setConversations(res.data)
      } catch (err) {
        console.log(err)
      }
    }

    getConversations()
  }, [user._id])


  return (
    <>
      <Topbar />
      <div className='messenger'>
        <div className='chatMenu'>
          <div className='chatMenuWrapper'>
            <input placeholder='Search for friends' className='chatMenuInput' />
            {conversations.map(conversation => (
              <Conversation
                key={conversation._id}
                currentUser={user}
                conversation={conversation}
              />
            ))}
          </div>
        </div>
        <div className='chatBox'>
          <div className='chatBoxWrapper'>
            <div className='chatBoxTop'>
              <Message />
              <Message />
              <Message own={'true'} />
              <Message />
              <Message />
              <Message own={'true'} />
              <Message />
              <Message />
              <Message own={'true'} />
              <Message />
            </div>
            <div className='chatBoxBottom'>
              <textarea
                className='chatMessageInput'
                placeholder='Type your message...'
              ></textarea>
              <button className='chatSubmitButton'>Send</button>
            </div>
          </div>
        </div>
        <div className='chatOnline'>
          <div className='chatOnlineWrapper'>
            <ChatOnline />
            <ChatOnline />
            <ChatOnline />
          </div>
        </div>
      </div>
    </>
  )
}
