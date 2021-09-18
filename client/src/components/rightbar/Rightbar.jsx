import './rightbar.css';

import { Users } from '../../dummyData';
import OnlineFriend from '../onlineFriend/OnlineFriend';
import { Fragment } from 'react';

const Rightbar = ({ profile }) => {
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
      <h4 className='rightbarTitle'>User information</h4>
      <div className='rightbarInfo'>
        <div className='rightbarInfoItem'>
          <span className='rightbarInfoKey'>City: </span>
          <span className='rightbarInfoValue'>New York</span>
        </div>
        <div className='rightbarInfoItem'>
          <span className='rightbarInfoKey'>From: </span>
          <span className='rightbarInfoValue'>Egypt</span>
        </div>
        <div className='rightbarInfoItem'>
          <span className='rightbarInfoKey'>Relationship: </span>
          <span className='rightbarInfoValue'>Single</span>
        </div>
      </div>
      <h4 className='rightbarTitle'>User friends</h4>

      <div className='rightbarFollowings'>
        <div className='rightbarFollowing'>
          <img
            src='/assets/persons/2.jpeg'
            alt=''
            className='rightbarFollowingImg'
          />
          <span className='rightbarFollowingName'>username</span>
        </div>
        <div className='rightbarFollowing'>
          <img
            src='/assets/persons/3.jpeg'
            alt=''
            className='rightbarFollowingImg'
          />
          <span className='rightbarFollowingName'>username</span>
        </div>
        <div className='rightbarFollowing'>
          <img
            src='/assets/persons/4.jpeg'
            alt=''
            className='rightbarFollowingImg'
          />
          <span className='rightbarFollowingName'>username</span>
        </div>
      </div>
    </Fragment>
  );

  return (
    <div className='rightbar'>
      <div className='rightbarWrapper'>
        {profile ? <ProfileRightbar /> : <HomeRightbar />}
      </div>
    </div>
  );
};

export default Rightbar;
