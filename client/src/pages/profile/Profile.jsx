import './profile.css';
import Topbar from '../../components/topbar/Topbar';
import Sidebar from '../../components/sidebar/Sidebar';
import Rightbar from '../../components/rightbar/Rightbar';
import Feed from '../../components/feed/Feed';
import { Fragment } from 'react';

const Profile = () => {
  return (
    <Fragment>
      <Topbar />
      <div className='profile'>
        <Sidebar />
        <div className='profileRight'>
          <div className='profileRightTop'>
            <div className='profileCover'>
              <img
                src='/assets/posts/2.jpeg'
                alt=''
                className='profileCoverImg'
              />
              <img
                src='/assets/persons/7.jpeg'
                alt=''
                className='profileUserImg'
              />
            </div>
            <div className='profileInfo'>
              <h4 className='profileInfoName'>Name</h4>
              <p className='profileInfoDesc'>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iure
                illum doloremque delectus assumenda modi alias voluptate,
                tempora ea! Blanditiis dolorum debitis tenetur alias velit natus
                nesciunt corrupti doloremque ratione pariatur!
              </p>
            </div>
          </div>
          <div className='profileRightBottom'>
            <Feed />
            <Rightbar profile />
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Profile;
