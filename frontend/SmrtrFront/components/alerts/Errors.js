import React, { Component, Fragment } from 'react'
import { View, Alert } from 'react-native';

export default class Errors extends Component {

    mralert = () => {
        Alert.alert(
            (`${this.props.message}`),
            '',
          [
            {
              text: 'Cancel',
              onPress: () => console.log('Cancel Pressed'),
              style: 'cancel',
            },
            {text: 'Fuk Boi!', onPress: () => console.log('OK Pressed')},
          ],
        );
      }

    render() {
        return (
            <View>
                {this.mralert()}
            </View>
                                    
        )
    }
}
