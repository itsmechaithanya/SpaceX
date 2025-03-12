// navigators/MainTabs.js
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image } from 'react-native';
import LaunchStackNavigator from './LaunchStackNavigator';
import RocketStackNavigator from './RocketStackNavigator';
import FavoritesStackNavigator from './FavoritesStackNavigator';

const Tab = createBottomTabNavigator();

export default function MainTabs() {
  return (
    <Tab.Navigator
    screenOptions={{
      tabBarStyle: {
        width: '80%',
        marginLeft: '10%',
        position: 'absolute',
        bottom: 40,
        height: 60,
        borderRadius: 20,
        backgroundColor: '#fff',
      },
      tabBarActiveTintColor: 'blue',
      tabBarInactiveTintColor: 'gray',
    }}
    >
      <Tab.Screen
        name="Launches"
        component={LaunchStackNavigator}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Image
              source={require('../assets/launches.png')}
              style={{ tintColor: color, width: size, height: size }}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Rockets"
        component={RocketStackNavigator}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Image
              source={require('../assets/rockets.png')}
              style={{ tintColor: color, width: size, height: size }}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Favorites"
        component={FavoritesStackNavigator}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Image
              source={require('../assets/favorites.png')}
              style={{ tintColor: color, width: size, height: size }}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
