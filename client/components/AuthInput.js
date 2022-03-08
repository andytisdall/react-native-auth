import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

const AuthInput = ({ onChange, type }) => {
  // Get input state setter
  // and input type from props

  return (
    <TextInput
      style={styles.input}
      placeholder={type === 'username' ? 'Username' : 'Password'}
      autoComplete="off"
      autoCorrect={false}
      onChangeText={onChange}
      secureTextEntry={type === 'password'}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    height: 50,
    width: '80%',
    margin: 20,
    borderWidth: 1,
    padding: 10,
    fontSize: 25,
  },
});

export default AuthInput;
