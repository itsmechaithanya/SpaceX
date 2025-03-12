import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { FavoritesProvider } from './context/FavoritesContext';
import WelcomeScreen from './screens/WelcomeScreen';
import MainTabs from './navigators/MainTabs';

const Stack = createStackNavigator();

export default function App() {
  return (
    <FavoritesProvider>
      <NavigationContainer>
        {/* Root stack with two screens: Welcome first, then MainTabs */}
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Welcome" component={WelcomeScreen} />
          <Stack.Screen name="MainTabs" component={MainTabs} />
        </Stack.Navigator>
      </NavigationContainer>
    </FavoritesProvider>
  );
}
