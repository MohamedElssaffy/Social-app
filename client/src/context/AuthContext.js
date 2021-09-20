import { createContext, useReducer } from 'react';

import AuthReducer from './AuthReducer';

const initState = {
  user: null,
  isFetching: false,
  error: false,
};

export const AuthContext = createContext(initState);

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, initState);

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        isFetching: state.isFetching,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
