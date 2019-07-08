import React from 'react';
import { Platform } from 'react-native';
import {
  createStackNavigator,
  createAppContainer
} from 'react-navigation';

import Login from '../screens/authscreens/Login';
import Register from '../screens/authscreens/Register';


const AuthStack = createStackNavigator(
  {
  Login: Login,
  Register: Register,
  },
  {
    headerMode: 'none'

  }
);


export default createAppContainer(AuthStack);
