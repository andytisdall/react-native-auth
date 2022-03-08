import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import AuthContext from '../context/authContext';

const Dashboard = () => {
  const { state } = useContext(AuthContext);

  return (
    <View style={styles.dashboardContainer}>
      <Text>You have signed in, {state.user}!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  dashboardContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Dashboard;
