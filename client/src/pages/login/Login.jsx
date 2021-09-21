import { useContext, useRef } from 'react';
import { Link } from 'react-router-dom';

import { loginCall } from '../../apiCalls';
import { AuthContext } from '../../context/AuthContext';
import './login.css';

const Login = () => {
  const email = useRef();
  const password = useRef();

  const { dispatch } = useContext(AuthContext);

  const onSubmit = (e) => {
    e.preventDefault();
    loginCall(
      { email: email.current.value, password: password.current.value },
      dispatch
    );
  };

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
          <form className='loginBox' onSubmit={onSubmit}>
            <input
              type='email'
              ref={email}
              required
              placeholder='Email'
              className='loginInput'
            />
            <input
              type='password'
              ref={password}
              placeholder='Password'
              className='loginInput'
              required
              minLength='8'
            />
            <button className='loginBtn' type='submit'>
              Login
            </button>
            <span className='loginForgetPass'>Forget Password ?</span>

            <Link to='/register' className='loginRegisterBtn'>
              Create a new account
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
