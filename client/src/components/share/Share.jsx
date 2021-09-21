import {
  PermMedia,
  Label,
  Room,
  EmojiEmotions,
  Cancel,
} from '@mui/icons-material';
import { useContext, useRef, useState } from 'react';
import './share.css';
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';

const Share = () => {
  const { user } = useContext(AuthContext);
  const desc = useRef();
  const [file, setFile] = useState(null);

  const onChange = (e) => {
    setFile(e.target.files[0]);
  };

  const onClick = () => setFile(null);

  const onSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    if (file) {
      data.append('img', file);
    }
    data.append('desc', desc.current.value);
    data.append('userId', user._id);
    try {
      await axios.post('/posts', data);
      window.location.reload();
    } catch (err) {}
  };
  return (
    <div className='share'>
      <div className='shareWrapper'>
        <div className='shareTop'>
          <img
            src={user.profilePicture || '/assets/default.png'}
            alt=''
            className='shareImg'
          />
          <input
            type='text'
            placeholder={`What's in your mind ${user.username}?`}
            className='shareInput'
            ref={desc}
          />
        </div>
        {file && (
          <div className='shareImgContainer'>
            <img
              src={URL.createObjectURL(file)}
              alt=''
              className='shareTopImg'
            />
            <Cancel className='shareCancel' onClick={onClick} />
          </div>
        )}
        <hr className='shareHr' />
        <form onSubmit={onSubmit} className='shareBottom'>
          <div className='shareOptions'>
            <label htmlFor='file' className='shareOption'>
              <PermMedia htmlColor='tomato' className='shareIcon' />
              <span className='shareOptionText'>Photo or video</span>
              <input
                hidden
                type='file'
                id='file'
                accept='.png,.jpeg,.jpg'
                onChange={onChange}
              />
            </label>
            <div className='shareOption'>
              <Label htmlColor='blue' className='shareIcon' />
              <span className='shareOptionText'>Tag</span>
            </div>
            <div className='shareOption'>
              <Room htmlColor='green' className='shareIcon' />
              <span className='shareOptionText'>Location</span>
            </div>
            <div className='shareOption'>
              <EmojiEmotions htmlColor='goldenrod' className='shareIcon' />
              <span className='shareOptionText'>Feelings</span>
            </div>
            <button type='submit' className='shareBtn'>
              Share
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Share;
