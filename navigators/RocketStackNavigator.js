// navigators/RocketStackNavigator.js
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import RocketListScreen from '../screens/RocketListScreen';
import RocketDetailsScreen from '../screens/RocketDetailsScreen';

const Stack = createStackNavigator();

export default function RocketStackNavigator() {
  return (
    <Stack.Navigator>
      {/* Hide header on the main rocket list screen */}
      <Stack.Screen
        name="RocketList"
        component={RocketListScreen}
        options={{ headerShown: false }} 
      />
      {/* Keep header on the details screen (if you want a back button) */}
      <Stack.Screen
        name="RocketDetails"
        component={RocketDetailsScreen}
        options={{ title: 'Rocket Details' }}
      />
    </Stack.Navigator>
  );
}
