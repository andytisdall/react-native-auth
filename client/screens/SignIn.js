import React, { useState, useContext } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';

import AuthContext from '../context/authContext';
import AuthInput from '../components/AuthInput';
import sharedStyles from '../style/sharedStyles.js';

const SignIn = ({ navigation }) => {
  const { signIn, state, throwError } = useContext(AuthContext);

  const [username, setUsername] = useState();
  const [password, setPassword] = useState();

  const onSubmit = () => {
    if (!username) {
      throwError('You must enter a username');
    } else if (!password) {
      throwError('You must enter a password');
    } else {
      signIn(username, password);
    }
  };

  const renderErrors = () => {
    if (state.error) {
      return <Text style={sharedStyles.error}>{state.error}</Text>;
    }
  };

  return (
    <View style={sharedStyles.authContainer}>
      <Text style={sharedStyles.authHeader}>Sign In</Text>
      <AuthInput
        onChange={setUsername}
        type="username"
        placeholder="Username"
      />
      <AuthInput
        onChange={setPassword}
        type="password"
        placeholder="Password"
      />
      <TouchableOpacity onPress={onSubmit}>
        <Text style={sharedStyles.button}>Sign In</Text>
      </TouchableOpacity>
      <Text onPress={() => navigation.navigate('SignUp')}>
        Don't have an account yet?
        <Text style={{ color: 'blue' }}> Sign Up!</Text>
      </Text>
      {renderErrors()}
    </View>
  );
};

export default SignIn;
