import './rightbar.css';

import { Users } from '../../dummyData';
import OnlineFriend from '../onlineFriend/OnlineFriend';
import { Fragment, useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { Add, Remove } from '@mui/icons-material';
import axios from 'axios';
import { follow, unFollow } from '../../context/AuthActions';

const Rightbar = ({ user }) => {
  const { user: currentUser, dispatch } = useContext(AuthContext);
  let isFriend;
  if (user) {
    isFriend = currentUser.following.includes(user._id);
  } else {
    isFriend = false;
  }
  const [isFollowed, setIsFollowed] = useState(isFriend);

  const onClick = async () => {
    try {
      if (isFollowed) {
        await axios.patch(`/users/${user._id}/unfollow`, {
          userId: currentUser._id,
        });
        dispatch(unFollow());
      } else {
        await axios.patch(`/users/${user._id}/follow`, {
          userId: currentUser._id,
        });
        dispatch(follow());
      }
      setIsFollowed(!isFollowed);
    } catch (err) {
      console.error(err);
    }
  };

  const HomeRightbar = () => (
    <Fragment>
      <div className='birthdayContainer'>
        <img src='/assets/gift.png' alt='' className='birthdayImg' />
        <span className='birthdayText'>
          <b>Username</b> and <b>3 other friends</b> have a birthday today
        </span>
      </div>
      <img src='/assets/ad.png' alt='' className='rightbarAd' />
      <h4 className='rightbarTitle'>Online Friends</h4>
      <ul className='rightbarFriendList'>
        {Users.map((u) => (
          <OnlineFriend key={u.id} user={u} />
        ))}
      </ul>
    </Fragment>
  );

  const ProfileRightbar = () => (
    <Fragment>
      {user.username !== currentUser.username && (
        <button onClick={onClick} className='rightbarFollowBtn'>
          {isFollowed ? 'Unfollow' : 'Follow'}
          {isFollowed ? <Remove /> : <Add />}
        </button>
      )}
      <h4 className='rightbarTitle'>User information</h4>
      <div className='rightbarInfo'>
        <div className='rightbarInfoItem'>
          <span className='rightbarInfoKey'>City: </span>
          <span className='rightbarInfoValue'>
            {user.city ? user.city : 'Unknown'}
          </span>
        </div>
        <div className='rightbarInfoItem'>
          <span className='rightbarInfoKey'>From: </span>
          <span className='rightbarInfoValue'>
            {user.from ? user.from : 'Unknown'}
          </span>
        </div>
        <div className='rightbarInfoItem'>
          <span className='rightbarInfoKey'>Relationship: </span>
          <span className='rightbarInfoValue'>
            {user.relationship === 1
              ? 'Single'
              : user.relationship === 2
              ? 'Married'
              : 'Unknown'}
          </span>
        </div>
      </div>
      <h4 className='rightbarTitle'>User friends</h4>

      <div className='rightbarFollowings'>
        {user.following &&
          user.following.map((friend) => (
            <Link
              key={friend._id}
              to={`/profile/${friend.username}`}
              className='rightbarFollowing'
            >
              <img
                src={friend.profilePicture || '/assets/default.png'}
                alt=''
                className='rightbarFollowingImg'
              />
              <span className='rightbarFollowingName'>{friend.username}</span>
            </Link>
          ))}
      </div>
    </Fragment>
  );

  return (
    <div className='rightbar'>
      <div className='rightbarWrapper'>
        {user ? <ProfileRightbar /> : <HomeRightbar />}
      </div>
    </div>
  );
};

export default Rightbar;
