import React, { useState, useContext } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';

import AuthContext from '../context/authContext';
import AuthInput from '../components/AuthInput';
import sharedStyles from '../style/sharedStyles.js';

const SignIn = () => {
  const { signIn } = useContext(AuthContext);

  const [username, setUsername] = useState();
  const [password, setPassword] = useState();

  const onSubmit = () => {
    signIn(username, password);
  };

  return (
    <View style={sharedStyles.authContainer}>
      <AuthInput onChange={setUsername} type="username" />
      <AuthInput onChange={setPassword} type="password" />
      <TouchableOpacity onPress={onSubmit}>
        <Text style={sharedStyles.button}>Sign In</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SignIn;
