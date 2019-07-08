import React, { Component, Fragment } from 'react';
import { Text, View } from 'react-native';
import { Icon } from 'react-native-elements';
import ProfileIcon from '../navigation/ProfileIcon';

export default class Analytics extends Component {

  static navigationOptions = () => {
    return {
    title: 'Analytics',
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
    }}


  render() {
    return (
      <Fragment>
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <Text>We'll test out here</Text>
        </View>
      </Fragment>
    );
  }

  
}





