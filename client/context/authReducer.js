export default (state, action) => {
  switch (action.type) {
    case 'SIGN_IN':
      return { user: action.payload, signedIn: true };
    default:
      return state;
  }
};
