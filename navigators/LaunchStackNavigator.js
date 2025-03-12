// navigators/LaunchStackNavigator.js
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LaunchListScreen from '../screens/LaunchListScreen';
import LaunchDetailsScreen from '../screens/LaunchDetailsScreen';

const Stack = createStackNavigator();

export default function LaunchStackNavigator() {
  return (
    <Stack.Navigator>
      {/* Hide header on the main list screen */}
      <Stack.Screen
        name="LaunchList"
        component={LaunchListScreen}
        options={{ headerShown: false }} 
      />
      {/* Show header + back button on detail screen */}
      <Stack.Screen
        name="LaunchDetails"
        component={LaunchDetailsScreen}
        options={{ title: 'Launch Details' }}
      />
    </Stack.Navigator>
  );
}
