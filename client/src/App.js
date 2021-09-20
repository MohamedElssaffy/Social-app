import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';

import Home from './pages/home/Home';
import Profile from './pages/profile/Profile';
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import { useContext } from 'react';
import { AuthContext } from './context/AuthContext';

function App() {
  const { user } = useContext(AuthContext);
  return (
    <Router>
      <Switch>
        <Route path='/' exact>
          {user ? <Home /> : <Redirect to='/login' />}
        </Route>
        <Route path='/login'>{user ? <Redirect to='/' /> : <Login />} </Route>
        <Route path='/register'>
          {user ? <Redirect to='/' /> : <Register />}{' '}
        </Route>
        <Route path='/profile/:username' component={Profile} />
      </Switch>
    </Router>
  );
}

export default App;
