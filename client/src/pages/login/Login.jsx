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
          <form className='loginBox'>
            <input type='email' placeholder='Email' className='loginInput' />
            <input
              type='password'
              placeholder='Password'
              className='loginInput'
            />
            <button className='loginBtn'>Login</button>
            <span className='loginForgetPass'>Forget Password ?</span>
            <button className='loginRegisterBtn'>Create a new account</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
