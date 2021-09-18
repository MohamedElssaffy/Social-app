import './login.css';

const Login = () => {
  return (
    <div className='login'>
      <div className='loginWrapper'>
        <div className='loginLeft'>
          <h3 className='loginLogo'>Social</h3>
          <p className='loginDesc'>
            Connect with friends and the world around you on Social.
          </p>
        </div>
        <div className='loginRight'>
          <div className='loginBox'></div>
        </div>
      </div>
    </div>
  );
};

export default Login;
