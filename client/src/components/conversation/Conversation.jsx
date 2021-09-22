import React, { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import './conversation.css';

const Conversation = ({ conversation }) => {
  const { user } = useContext(AuthContext);
  let friend = {};
  if (conversation.sender._id !== user._id) {
    friend = conversation.sender;
  } else {
    friend = conversation.receiver;
  }

  return (
    <div className='conversation'>
      <img
        src={friend.profilePicture || '/assets/default.png'}
        alt=''
        className='conversationImg'
      />
      <span className='conversationName'>{friend.username}</span>
    </div>
  );
};

export default Conversation;
