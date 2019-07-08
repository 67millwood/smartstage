import React, { Component, Fragment } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import ProfileIcon from '../navigation/ProfileIcon';



export default class BeltsScreen extends Component {
  render() {
    return (
      null
    );
  }
}

BeltsScreen.navigationOptions = {
  title: 'Belts Screen',
  headerStyle: {
    backgroundColor: '#f4511e',
  },
  headerTintColor: '#fff',
  headerTitleStyle: {
    fontWeight: 'bold',
  },
  headerRight: (
    <View>
      <ProfileIcon />

    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
});
