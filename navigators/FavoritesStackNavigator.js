// navigators/FavoritesStackNavigator.js
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import FavoritesScreen from '../screens/FavoritesScreen';
import LaunchDetailsScreen from '../screens/LaunchDetailsScreen';

const Stack = createStackNavigator();

export default function FavoritesStackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="FavoritesScreen"
        component={FavoritesScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="LaunchDetails"
        component={LaunchDetailsScreen}
        options={{ title: 'Launch Details' }}
      />
    </Stack.Navigator>
  );
}
