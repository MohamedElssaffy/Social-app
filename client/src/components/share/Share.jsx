import { PermMedia } from '@mui/icons-material';
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
              <PermMedia className='shareIcon' />
              <span className='shareOptionText'>Photo or video</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Share;
