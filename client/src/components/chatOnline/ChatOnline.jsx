import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './chatOnline.css';

const ChatOnline = ({ onlineUsers, currentId, setCurrentConv }) => {
  const [friends, setFriends] = useState([]);
  const [onlineFriends, setOnlineFriends] = useState([]);
  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await axios.get(`/users/${currentId}`);
        setFriends(res.data.following);
      } catch (err) {
        console.error(err);
      }
    };
    getUser();
  }, [currentId]);

  useEffect(() => {
    setOnlineFriends(friends.filter((f) => onlineUsers.includes(f._id)));
  }, [onlineUsers, friends]);

  const handelClick = async (user) => {
    try {
      const res = await axios.get(`/conversation/${user._id}/${currentId}`);
      console.log(res);
      setCurrentConv(res.data);
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div>
      {onlineFriends.map((user) => (
        <div
          className='chatOnlineFriend'
          onClick={() => handelClick(user)}
          key={user._id}
        >
          <div className='chatOnlineImgContainer'>
            <img
              src={user.profilePicture || '/assets/default.png'}
              className='chatOnlineImg'
              alt=''
            />
            <div className='chatOnlineBadge'></div>
          </div>
          <span className='chatOnlineUsername'>{user.username} </span>
        </div>
      ))}
    </div>
  );
};

export default ChatOnline;
