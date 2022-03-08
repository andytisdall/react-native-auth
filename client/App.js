import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useReducer } from 'react';

import AuthContext from './context/authContext';
import SignIn from './screens/SignIn';
import SignUp from './screens/SignUp';
import Dashboard from './screens/Dashboard';
import authActions from './context/authActions';
import authReducer from './context/authReducer';

const Stack = createNativeStackNavigator();

const initialState = {
  signedIn: false,
};

export default function App() {
  // set up state object using reducer

  const [state, dispatch] = useReducer(authReducer, initialState);

  // we have to use this dispatch function within the actions, so each action creator will be called with dispatch and return an action creator that is bound to the state.

  let boundActions = {};
  for (let action in authActions) {
    boundActions[action] = authActions[action](dispatch);
  }

  const renderAuth = () => {
    return (
      <>
        <Stack.Screen name="SignIn" component={SignIn} />
        {/* <Stack.Screen name="SignUp" component={SignUp} /> */}
      </>
    );
  };

  const renderDashboard = () => {
    return (
      <>
        <Stack.Screen name="Dashboard" component={Dashboard} />
      </>
    );
  };

  // Check the auth state and conditionally show auth flow or dashboard

  return (
    <AuthContext.Provider value={{ state, ...boundActions }}>
      <NavigationContainer>
        <Stack.Navigator>
          {state.signedIn ? renderDashboard() : renderAuth()}
        </Stack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
