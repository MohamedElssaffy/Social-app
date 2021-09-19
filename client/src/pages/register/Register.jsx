import './register.css';

const Register = () => {
  return (
    <div className='register'>
      <div className='registerWrapper'>
        <div className='registerLeft'>
          <h3 className='registerLogo'>Social</h3>
          <p className='registerDesc'>
            Connect with friends and the world around you on Social.
          </p>
        </div>
        <div className='registerRight'>
          <form className='registerBox'>
            <input
              type='text'
              placeholder='Username'
              className='registerInput'
            />
            <input type='email' placeholder='Email' className='registerInput' />
            <input
              type='password'
              placeholder='Password'
              className='registerInput'
            />
            <input
              type='password'
              placeholder='Password'
              className='registerInput'
            />
            <button className='registerBtn'>Sign up</button>
            <button className='registerRegisterBtn'>
              Login to your account
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
