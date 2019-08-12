import React from 'react';
import { Platform } from 'react-native';
import {
  createStackNavigator,
  createBottomTabNavigator,
} from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import BeltsScreen from '../screens/BeltsScreen';
import Analytics from '../screens/AnalyticsScreen';
import QuestionScreen from '../screens/questionscreens/questionscreen';
import ReviewScreen from '../screens/reviewscreens/reviewscreen';

const HomeStack = createStackNavigator({
  Home: HomeScreen,
  Review: ReviewScreen,
  Question: QuestionScreen,
    
  
});


HomeStack.navigationOptions = ({ navigation }) => {
  let tabBarVisible = true;
  if (navigation.state.index > 0) {
    tabBarVisible = false;
  }

  return {
    tabBarVisible,
    tabBarLabel: 'Home',
    tabBarIcon: ({ focused }) => (
      <TabBarIcon
        focused={focused}
        name={
          Platform.OS === 'ios'
            ? `ios-information-circle${focused ? '' : '-outline'}`
            : 'md-information-circle'
        }
      />
    ),
  

  };
};



const BeltStack = createStackNavigator({
  Belts: BeltsScreen,
});

BeltStack.navigationOptions = {
  tabBarLabel: 'Belts',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-ribbon' : 'md-link'}
    />
  ),
};

const AnalyticsStack = createStackNavigator({
  Analytics: Analytics,
});

AnalyticsStack.navigationOptions = {
  tabBarLabel: 'Analytics',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-apps' : 'md-options'}
    />
  ),
  title: 'Analytics!',
};

export default createBottomTabNavigator({
  HomeStack,
  BeltStack,
  AnalyticsStack,
}
);
