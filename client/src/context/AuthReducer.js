const AuthReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case 'LOGIN_START':
      return {
        user: null,
        isFetching: true,
        error: false,
      };
    case 'LOGIN_SUCCESS':
      return {
        user: payload,
        isFetching: false,
        error: false,
      };
    case 'LOGIN_FAILURE':
      return {
        user: null,
        isFetching: false,
        error: payload,
      };
    case 'Follow':
      return {
        ...state,
        user: {
          ...state.user,
          following: [...state.user.following, payload],
        },
      };
    case 'UNFollow':
      return {
        ...state,
        user: {
          ...state.user,
          following: [state.user.following.filter((u) => u !== payload)],
        },
      };
    default:
      return state;
  }
};

export { AuthReducer as default };
