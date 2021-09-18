import { PermMedia, Label, Room, EmojiEmotions } from '@mui/icons-material';
import './share.css';

const Share = () => {
  return (
    <div className='share'>
      <div className='shareWrapper'>
        <div className='shareTop'>
          <img src='/assets/persons/1.jpeg' alt='' className='shareImg' />
          <input
            type='text'
            placeholder="What's in your mind"
            className='shareInput'
          />
        </div>
        <hr className='shareHr' />
        <div className='shareBottom'>
          <div className='shareOptions'>
            <div className='shareOption'>
              <PermMedia htmlColor='tomato' className='shareIcon' />
              <span className='shareOptionText'>Photo or video</span>
            </div>
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
            <button className='shareBtn'>Share</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Share;
