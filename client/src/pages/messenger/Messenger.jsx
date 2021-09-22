import React, {
  Fragment,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import './messenger.css';
import Topbar from '../../components/topbar/Topbar';
import Conversation from '../../components/conversation/Conversation';
import Message from '../../components/message/Message';
import ChatOnline from '../../components/chatOnline/ChatOnline';
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';

const Messenger = () => {
  const { user } = useContext(AuthContext);
  const [conversation, setConversation] = useState([]);
  const [currentConv, setCurrentConv] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState([]);

  const scrollRef = useRef();

  useEffect(() => {
    const getConv = async () => {
      try {
        const res = await axios.get(`/conversation/${user._id}`);
        setConversation(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    const getMsg = async () => {
      try {
        const res = await axios.get(`/message/${currentConv?._id}`);
        setMessages(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    getMsg();
    getConv();
  }, [user, currentConv]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSubmit = async () => {
    const message = {
      sender: user._id,
      text: newMessage,
      conversation: currentConv._id,
    };

    try {
      const res = await axios.post('/message', message);
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
                        <Message message={msg} own={msg.sender === user._id} />
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
            <ChatOnline />
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Messenger;
