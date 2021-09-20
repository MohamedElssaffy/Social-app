import axios from 'axios';
import { loginFailure, loginStart, loginٍSuccess } from './context/AuthActions';

export const loginCall = async (credentials, dispatch) => {
  dispatch(loginStart());
  try {
    const res = await axios.post('/auth/login', credentials);
    dispatch(loginٍSuccess(res.data));
  } catch (err) {
    dispatch(loginFailure(err));
  }
};
