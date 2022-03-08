import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import AuthContext from '../context/authContext';

const Dashboard = () => {
  const { state } = useContext(AuthContext);

  return (
    <View style={styles.dashboardContainer}>
      <Text style={styles.dashboardText}>
        You have signed in, {state.user}!
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  dashboardContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingVertical: 100,
    paddingHorizontal: 30,
    backgroundColor: '#C6FCFF',
  },
  dashboardText: {
    fontSize: 60,
    fontWeight: '600',
    textAlign: 'center',
    color: 'purple',
  },
});

export default Dashboard;
