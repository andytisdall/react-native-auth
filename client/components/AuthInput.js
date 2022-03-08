import React, { useContext } from 'react';
import { TextInput, StyleSheet } from 'react-native';

import authContext from '../context/authContext';

const AuthInput = ({ onChange, type, placeholder }) => {
  // Get input state setter
  // and input type from props
  // and input label

  const { throwError } = useContext(authContext);

  return (
    <TextInput
      style={styles.input}
      placeholder={placeholder}
      autoComplete="off"
      autoCorrect={false}
      onChangeText={onChange}
      secureTextEntry={type === 'password'}
      onFocus={() => throwError(null)}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    height: 50,
    width: '80%',
    margin: 10,
    borderWidth: 1,
    padding: 10,
    fontSize: 25,
    backgroundColor: 'white',
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
});

export default AuthInput;
