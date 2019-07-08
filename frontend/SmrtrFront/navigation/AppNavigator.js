import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import MainTabNavigator from './MainTabNavigator';
import AuthNavigator from './AuthNavigator';
// import Login from '../screens/authscreens/Login';
import ProfilePage from '../screens/authscreens/ProfilePage';
import AuthLoadingScreen from '../screens/authscreens/AuthLoadingScreen';

export default createAppContainer(
  createSwitchNavigator({
    // You could add another route here for authentication.
    // Read more at https://reactnavigation.org/docs/en/auth-flow.html
    Auth: AuthLoadingScreen,
    Main: MainTabNavigator,
    Authnav: AuthNavigator,
    Profile: ProfilePage,
  },
  {
    initialRouteName: 'Auth'
  }
  ));
