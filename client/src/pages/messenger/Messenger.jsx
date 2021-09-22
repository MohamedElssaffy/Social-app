import React, {
  Fragment,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import axios from 'axios';
import { io } from 'socket.io-client';

import './messenger.css';
import Topbar from '../../components/topbar/Topbar';
import Conversation from '../../components/conversation/Conversation';
import Message from '../../components/message/Message';
import ChatOnline from '../../components/chatOnline/ChatOnline';
import { AuthContext } from '../../context/AuthContext';

const Messenger = () => {
  const { user } = useContext(AuthContext);
  const [conversation, setConversation] = useState([]);
  const [currentConv, setCurrentConv] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const socket = useRef();
  const scrollRef = useRef();

  useEffect(() => {
    socket.current = io('ws://localhost:8000');
    socket.current.on('getMessage', (data) => {
      setArrivalMessage({
        sender: { _id: data.senderId },
        text: data.text,
        createdAt: Date.now(),
      });
    });
  });

  useEffect(() => {
    arrivalMessage &&
      (currentConv?.sender._id === arrivalMessage.sender._id ||
        currentConv?.receiver._id === arrivalMessage.sender._id) &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentConv]);

  useEffect(() => {
    socket.current.emit('addUser', user._id);
    socket.current.on('getUsers', (users) => {
      setOnlineUsers(users.map((u) => u.userId));
    });
  }, [user]);

  useEffect(() => {
    const getConv = async () => {
      try {
        const res = await axios.get(`/conversation/${user._id}`);
        setConversation(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    getConv();
  }, [user]);

  useEffect(() => {
    const getMsg = async () => {
      try {
        const res = await axios.get(`/message/${currentConv?._id}`);
        setMessages(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    getMsg();
  }, [currentConv]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSubmit = async () => {
    const message = {
      sender: user._id,
      text: newMessage,
      conversation: currentConv._id,
    };

    const receiverId =
      currentConv.sender._id === user._id
        ? currentConv.receiver._id
        : currentConv.sender._id;

    try {
      const res = await axios.post('/message', message);
      socket.current.emit('sendMessage', {
        senderId: user._id,
        receiverId,
        text: newMessage,
      });
      res.data.sender = { _id: user._id };
      setMessages([...messages, res.data]);
      setNewMessage('');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Fragment>
      <Topbar />
      <div className='msg'>
        <div className='chatMenu'>
          <div className='chatWrapper'>
            <input
              type='text'
              placeholder='Search for friends'
              className='chatMenuInput'
            />
            {conversation.map((conv) => (
              <div key={conv._id} onClick={() => setCurrentConv(conv)}>
                <Conversation conversation={conv} />
              </div>
            ))}
          </div>
        </div>
        <div className='chatBox'>
          <div className='chatWrapper'>
            {currentConv ? (
              <Fragment>
                <div className='chatBoxTop'>
                  {messages.map((msg) => {
                    return (
                      <div key={msg._id} ref={scrollRef}>
                        <Message
                          message={msg}
                          own={msg.sender._id === user._id}
                        />
                      </div>
                    );
                  })}
                </div>
                <div className='chatBxBottom'>
                  <textarea
                    className='chatMessageInput'
                    placeholder='write something...'
                    cols='30'
                    rows='10'
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                  ></textarea>
                  <button className='chatBoxBtn' onClick={handleSubmit}>
                    Sent
                  </button>
                </div>
              </Fragment>
            ) : (
              <span className='noConversationText'>
                Open a conversation to start chat.
              </span>
            )}
          </div>
        </div>
        <div className='chatOnline'>
          <div className='chatWrapper'>
            <ChatOnline
              onlineUsers={onlineUsers}
              currentId={user._id}
              setCurrentConv={setCurrentConv}
            />
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Messenger;
