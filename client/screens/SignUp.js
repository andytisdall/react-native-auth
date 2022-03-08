import React, { useState, useContext, useEffect } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';

import AuthContext from '../context/authContext';
import AuthInput from '../components/AuthInput';
import sharedStyles from '../style/sharedStyles.js';

const SignUp = () => {
  const { signUp, state, throwError } = useContext(AuthContext);

  const [username, setUsername] = useState();
  const [password1, setPassword1] = useState();
  const [password2, setPassword2] = useState();

  // clear any error messages when mounting and unmounting (navigating away)
  useEffect(() => {
    throwError(null);
    return () => {
      throwError(null);
    };
  }, []);

  const onSubmit = () => {
    // Validate that input data exists and the two passwords match
    // before dispatching sign up action
    if (!username) {
      throwError('You must enter a username');
    } else if (!password1) {
      throwError('You must enter a password');
    } else if (password1 !== password2) {
      throwError('Passwords do not match!');
    } else {
      signUp(username, password1);
    }
  };

  const renderErrors = () => {
    if (state.error) {
      return <Text style={sharedStyles.error}>{state.error}</Text>;
    }
  };

  return (
    <View style={sharedStyles.authContainer}>
      <Text style={sharedStyles.authHeader}>Sign Up</Text>
      <AuthInput
        onChange={setUsername}
        type="username"
        placeholder="Username"
      />
      <AuthInput
        onChange={setPassword1}
        type="password"
        placeholder="Password"
      />
      <AuthInput
        onChange={setPassword2}
        type="password"
        placeholder="Retype Password"
      />
      <TouchableOpacity onPress={onSubmit}>
        <Text style={sharedStyles.button}>Sign Up</Text>
      </TouchableOpacity>
      {renderErrors()}
    </View>
  );
};

export default SignUp;
