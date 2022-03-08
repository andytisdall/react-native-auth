import * as SecureStore from 'expo-secure-store';

import authApi from '../apis/authApi';

const signIn = (dispatch) => async (username, password) => {
  try {
    // Send credentials to server
    // get back object with token and username on successful sign in
    const response = await authApi.post('/signin', {
      username,
      password,
    });
    // persist token in local storage for automatic sign in on app refresh
    await SecureStore.setItemAsync('token', response.data.token);
    // send reducer the user data to put it in state
    dispatch({
      type: 'SIGN_IN',
      payload: { username: response.data.username },
    });
  } catch (err) {
    // on failed network request, send error to state for render in the component
    dispatch({ type: 'ERROR', payload: err.message });
  }
};

const signUp = (dispatch) => async (username, password) => {
  // Essentially the same stuff with a different api route
  try {
    const response = await authApi.post('/signup', {
      username,
      password,
    });
    await SecureStore.setItemAsync('token', response.data.token);

    dispatch({
      type: 'SIGN_IN',
      payload: { username: response.data.username },
    });
  } catch (err) {
    dispatch({ type: 'ERROR', payload: err.message });
  }
};

const signOut = (dispatch) => async () => {
  // Clear token from storage
  await SecureStore.deleteItemAsync('token');
  dispatch({ type: 'SIGN_OUT' });
};

const fetchUser = (dispatch) => async () => {
  const token = await SecureStore.getItemAsync('token');
  if (token) {
    try {
      const response = await authApi.get('/user', {
        headers: {
          authorization: token,
        },
      });
      dispatch({ type: 'SIGN_IN', payload: response.data });
    } catch (err) {
      dispatch({ type: 'ERROR', payload: err.response.data });
    }
  }
};

const throwError = (dispatch) => (error) => {
  // So components can create their own custom errors
  dispatch({ type: 'ERROR', payload: error });
};

export default { signIn, signOut, signUp, fetchUser, throwError };
