import './topbar.css';
import { Search, Person, Chat, Notifications } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

const Topbar = () => {
  const { user } = useContext(AuthContext);
  return (
    <div className='topbar'>
      <div className='topbarLeft'>
        <Link to='/' className='logo'>
          Social
        </Link>
      </div>
      <div className='topbarCenter'>
        <div className='searchbar'>
          <Search className='searchIcon' />
          <input
            type='text'
            className='searchInput'
            placeholder='Search for friend or post'
          />
        </div>
      </div>
      <div className='topbarRight'>
        <div className='topbarLinks'>
          <span className='topbarLink'>Home</span>
          <span className='topbarLink'>Timeline</span>
        </div>
        <div className='topbarIcons'>
          <div className='topbarIconItem'>
            <Person />
            <span className='topbarIconBadge'>1</span>
          </div>
          <div className='topbarIconItem'>
            <Chat />
            <span className='topbarIconBadge'>2</span>
          </div>
          <div className='topbarIconItem'>
            <Notifications />
            <span className='topbarIconBadge'>1</span>
          </div>
        </div>
        <Link to={`/profile/${user.username}`}>
          <img
            src={user.profilePicture || '/assets/default.png'}
            alt=''
            className='topbarImg'
          />
        </Link>
      </div>
    </div>
  );
};

export default Topbar;
