export default (state, action) => {
  switch (action.type) {
    case 'SIGN_IN':
      return { user: action.payload.username, signedIn: true };
    case 'SIGN_OUT':
      return { signedIn: false };
    case 'ERROR':
      return { ...state, error: action.payload };
    default:
      return state;
  }
};
