export default {
  signIn: (dispatch) => async (username, password) => {
    // const response = await authApi.post('/signin', {
    //   username,
    //   password,
    // });
    dispatch({ type: 'SIGN_IN', payload: username });
  },
};
