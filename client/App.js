import { Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useReducer, useEffect } from 'react';

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

  // On first render, check for saved token in local storage for auto sign in
  useEffect(async () => {
    boundActions.fetchUser();
  }, []);

  const renderAuth = () => {
    // If not signed in, the sign in screen will be shown first
    // It has a link to the signup screen
    return (
      <>
        <Stack.Screen name="SignIn" component={SignIn} />
        <Stack.Screen name="SignUp" component={SignUp} />
      </>
    );
  };

  const renderDashboard = () => {
    // Dashboard has a signout link in the header
    return (
      <>
        <Stack.Screen
          name="Dashboard"
          component={Dashboard}
          options={{
            headerRight: () => (
              <Button onPress={boundActions.signOut} title="Sign Out" />
            ),
          }}
        />
      </>
    );
  };

  // Check the auth state and conditionally show auth flow or dashboard
  return (
    // Wrap everything in the context provider
    // It will share the state and action creators with child components
    // Then wrap screens in the navigation component
    <AuthContext.Provider value={{ state, ...boundActions }}>
      <NavigationContainer>
        <Stack.Navigator>
          {state.signedIn ? renderDashboard() : renderAuth()}
        </Stack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  );
}
