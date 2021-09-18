import { MoreVert } from '@mui/icons-material';

import { Users } from '../../dummyData';
import './post.css';

const Post = ({ post }) => {
  const user = Users.filter((u) => u.id === post.userId)[0];

  return (
    <div className='post'>
      <div className='postWrapper'>
        <div className='postTop'>
          <div className='postTopLeft'>
            <img
              src={user.profilePicture}
              alt='Person'
              className='postProfileImg'
            />
            <span className='postUsername'>{user.username}</span>
            <span className='postDate'>{post.date}</span>
          </div>
          <div className='postTopRight'>
            <MoreVert />
          </div>
        </div>
        <div className='postCenter'>
          <span className='postText'> {post.desc} </span>
          <img src={post.photo} alt='' className='postImg' />
        </div>
        <div className='postBottom'>
          <div className='postBottomLeft'>
            <img src='/assets/like.png' alt='' className='postLikeIcon' />
            <img src='/assets/heart.png' alt='' className='postLikeIcon' />
            <span className='postLikeCounter'>{post.like} people like it</span>
          </div>
          <div className='postBottomRight'>
            <span className='postComment'>{post.comment} Comments</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
