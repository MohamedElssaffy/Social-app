import React from 'react';
import './chatOnline.css';

const ChatOnline = () => {
  return (
    <div>
      <div className='chatOnlineFriend'>
        <div className='chatOnlineImgContainer'>
          <img src='/assets/persons/2.jpeg' className='chatOnlineImg' alt='' />
          <div className='chatOnlineBadge'></div>
        </div>
        <span className='chatOnlineUsername'>Name </span>
      </div>
    </div>
  );
};

export default ChatOnline;
