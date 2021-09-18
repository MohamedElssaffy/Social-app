import './friends.css';

const Friends = ({ user }) => {
  return (
    <li className='sidebarFriendItem'>
      <img src={user.profilePicture} alt='' className='sidebarFriendImg' />
      <span className='sidebarFriendName'>{user.username}</span>
    </li>
  );
};

export default Friends;
