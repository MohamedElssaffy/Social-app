import {
  Bookmark,
  Chat,
  Event,
  Group,
  HelpOutline,
  PlayCircleFilledOutlined,
  RssFeed,
  School,
  WorkOutline,
} from '@mui/icons-material';

import './sidebar.css';

const Sidebar = () => {
  return (
    <div className='sidebar'>
      <div className='sidebarWrapper'>
        <ul className='sidebarList'>
          <li className='sidebarListItem'>
            <RssFeed className='sidebarIcon' />
            <span className='sidebarListText'>Feed</span>
          </li>
          <li className='sidebarListItem'>
            <Chat className='sidebarIcon' />
            <span className='sidebarListText'>Chat</span>
          </li>
          <li className='sidebarListItem'>
            <PlayCircleFilledOutlined className='sidebarIcon' />
            <span className='sidebarListText'>Videos</span>
          </li>
          <li className='sidebarListItem'>
            <Group className='sidebarIcon' />
            <span className='sidebarListText'>Groups</span>
          </li>
          <li className='sidebarListItem'>
            <Bookmark className='sidebarIcon' />
            <span className='sidebarListText'>Bookmarks</span>
          </li>
          <li className='sidebarListItem'>
            <HelpOutline className='sidebarIcon' />
            <span className='sidebarListText'>Questions</span>
          </li>
          <li className='sidebarListItem'>
            <WorkOutline className='sidebarIcon' />
            <span className='sidebarListText'>Jobs</span>
          </li>
          <li className='sidebarListItem'>
            <Event className='sidebarIcon' />
            <span className='sidebarListText'>Events</span>
          </li>
          <li className='sidebarListItem'>
            <School className='sidebarIcon' />
            <span className='sidebarListText'>Courses</span>
          </li>
        </ul>
        <button className='sidebarBtn'>Show more</button>
        <hr className='sidebarHr' />
        <ul className='sidebarFriendList'>
          <li className='sidebarFriendItem'>
            <img
              src='/assets/persons/2.jpeg'
              alt=''
              className='sidebarFriendImg'
            />
            <span className='sidebarFriendName'>Name</span>
          </li>
          <li className='sidebarFriendItem'>
            <img
              src='/assets/persons/2.jpeg'
              alt=''
              className='sidebarFriendImg'
            />
            <span className='sidebarFriendName'>Name</span>
          </li>
          <li className='sidebarFriendItem'>
            <img
              src='/assets/persons/2.jpeg'
              alt=''
              className='sidebarFriendImg'
            />
            <span className='sidebarFriendName'>Name</span>
          </li>
          <li className='sidebarFriendItem'>
            <img
              src='/assets/persons/2.jpeg'
              alt=''
              className='sidebarFriendImg'
            />
            <span className='sidebarFriendName'>Name</span>
          </li>
          <li className='sidebarFriendItem'>
            <img
              src='/assets/persons/2.jpeg'
              alt=''
              className='sidebarFriendImg'
            />
            <span className='sidebarFriendName'>Name</span>
          </li>
          <li className='sidebarFriendItem'>
            <img
              src='/assets/persons/2.jpeg'
              alt=''
              className='sidebarFriendImg'
            />
            <span className='sidebarFriendName'>Name</span>
          </li>
          <li className='sidebarFriendItem'>
            <img
              src='/assets/persons/2.jpeg'
              alt=''
              className='sidebarFriendImg'
            />
            <span className='sidebarFriendName'>Name</span>
          </li>
          <li className='sidebarFriendItem'>
            <img
              src='/assets/persons/2.jpeg'
              alt=''
              className='sidebarFriendImg'
            />
            <span className='sidebarFriendName'>Name</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
