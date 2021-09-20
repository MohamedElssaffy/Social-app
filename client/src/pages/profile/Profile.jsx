import { Fragment, useEffect, useState } from 'react';
import axios from 'axios';

import './profile.css';
import Topbar from '../../components/topbar/Topbar';
import Sidebar from '../../components/sidebar/Sidebar';
import Rightbar from '../../components/rightbar/Rightbar';
import Feed from '../../components/feed/Feed';

const Profile = ({ match }) => {
  const [user, setUser] = useState({});

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`/users/profile/${match.params.username}`);
      if (res.status === 200) {
        setUser(res.data);
      }
    };
    fetchUser();
  }, [match]);
  return (
    <Fragment>
      <Topbar />
      <div className='profile'>
        <Sidebar />
        <div className='profileRight'>
          <div className='profileRightTop'>
            <div className='profileCover'>
              <img
                src={user.coverPicture || '/assets/defaultCover.jpeg'}
                alt=''
                className='profileCoverImg'
              />
              <img
                src={user.profilePicture || '/assets/default.png'}
                alt=''
                className='profileUserImg'
              />
            </div>
            <div className='profileInfo'>
              <h4 className='profileInfoName'>{user.username}</h4>
              <p className='profileInfoDesc'>{user.desc}</p>
            </div>
          </div>
          <div className='profileRightBottom'>
            <Feed username={match.params.username} />
            <Rightbar user={user} />
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Profile;
