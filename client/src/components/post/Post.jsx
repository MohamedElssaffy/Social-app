import { MoreVert } from '@mui/icons-material';
import { useContext, useEffect, useState } from 'react';
import { format } from 'timeago.js';

import './post.css';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';

const Post = ({ post }) => {
  const [like, setLike] = useState(post.likes.length);
  const [isLiked, setIsLiked] = useState(false);
  const { userId: user } = post;

  const { user: currentUser } = useContext(AuthContext);

  useEffect(() => {
    setIsLiked(post.likes.includes(currentUser._id));
  }, [post, currentUser]);

  const likeHandler = async () => {
    try {
      await axios.patch(`/posts/${post._id}/like`, { userId: currentUser._id });
      setLike(isLiked ? like - 1 : like + 1);
      setIsLiked(!isLiked);
    } catch (err) {}
  };

  return (
    <div className='post'>
      <div className='postWrapper'>
        <div className='postTop'>
          <div className='postTopLeft'>
            <Link to={`/profile/${user.username}`}>
              <img
                src={user.profilePicture || '/assets/default.png'}
                alt='Person'
                className='postProfileImg'
              />
            </Link>
            <span className='postUsername'>{user.username}</span>
            <span className='postDate'>{format(post.createdAt)}</span>
          </div>
          <div className='postTopRight'>
            <MoreVert />
          </div>
        </div>
        <div className='postCenter'>
          <span className='postText'> {post.desc} </span>
          <img src={`/assets/posts/${post.img}`} alt='' className='postImg' />
        </div>
        <div className='postBottom'>
          <div className='postBottomLeft'>
            <img
              src='/assets/like.png'
              onClick={likeHandler}
              alt=''
              className='postLikeIcon'
            />
            <span className='postLikeCounter'>{like} people like it</span>
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
