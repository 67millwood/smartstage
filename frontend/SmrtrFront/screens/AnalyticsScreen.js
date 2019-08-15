import React, { Component, Fragment } from 'react';
import { Text, View } from 'react-native';
import ProfileIcon from '../navigation/ProfileIcon';

import { styles } from '../screens/Mainstyles/mainstyle';

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
          <Text style={styles.mainlineText}>Coming Soon</Text>
        </View>
      </Fragment>
    );
  }

  
}





