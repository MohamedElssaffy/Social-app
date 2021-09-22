import axios from 'axios';
import { useRef } from 'react';
import { useHistory } from 'react-router';
import './register.css';

const Register = () => {
  const username = useRef();
  const email = useRef();
  const password = useRef();
  const password2 = useRef();

  const history = useHistory();

  const onSubmit = async (e) => {
    e.preventDefault();

    if (password.current.value !== password2.current.value) {
      password2.current.setCustomValidity('Password not match');
    } else {
      const user = {
        username: username.current.value,
        email: email.current.value,
        password: password.current.value,
      };
      try {
        await axios.post('/auth/register', user);
        history.push('/login');
      } catch (err) {
        console.log(err);
      }
    }
  };
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
          <form className='registerBox' onSubmit={onSubmit}>
            <input
              type='text'
              placeholder='Username'
              className='registerInput'
              required
              ref={username}
            />
            <input
              type='email'
              placeholder='Email'
              required
              ref={email}
              className='registerInput'
            />
            <input
              type='password'
              placeholder='Password'
              className='registerInput'
              required
              minLength='8'
              ref={password}
            />
            <input
              type='password'
              placeholder='Password'
              className='registerInput'
              required
              minLength='8'
              ref={password2}
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
