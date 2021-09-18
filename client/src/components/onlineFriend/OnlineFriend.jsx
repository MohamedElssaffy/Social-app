import './onlineFriend.css';

const OnlineFriend = ({ user }) => {
  return (
    <li className='rightbarFriend'>
      <div className='rightbarProfileImgContainer'>
        <img src={user.profilePicture} alt='' className='rightbarProfileImg' />
        <span className='rightbarOnline'></span>
      </div>
      <span className='rightbarFriendName'>{user.username}</span>
    </li>
  );
};

export default OnlineFriend;
