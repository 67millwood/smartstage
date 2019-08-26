import React from 'react';
import { Platform } from 'react-native';
import {
  createStackNavigator,
  createAppContainer
} from 'react-navigation';

import Login from '../screens/authscreens/Login';
import Register from '../screens/authscreens/Register';
import ResetPasswordScreen from '../screens/authscreens/Forgot';
import ResetTokenScreen from '../screens/authscreens/ResetToken';


const AuthStack = createStackNavigator(
  {
  Login: Login,
  Register: Register,
  Forgot: ResetPasswordScreen,
  ResetToken: ResetTokenScreen,
  },
  {
    headerMode: 'none'

  }
);


export default createAppContainer(AuthStack);
