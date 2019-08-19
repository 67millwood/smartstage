import React, { Component } from 'react';
import { View, StyleSheet, Text, Button, AsyncStorage } from 'react-native';

import HomeIcon from '../../navigation/HomeIcon';

export default class ProfilePage extends Component {
  constructor(props) {
    super(props)
  }

  /* render function, etc */


    logout = async () => {
      const userToken = await AsyncStorage.getItem('LoginToken');
      console.log(userToken)
        try { 
          return fetch('http://localhost:8080/api/auth/logout', {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
              'Authorization': `Token ${userToken}`,
            },
          })
          .then( await AsyncStorage.removeItem('LoginToken'));
        } 
        catch (error) {
          console.log('not removed')
      };
    }

    render() {
        const { navigate } = this.props.navigation
        return (
             
                <View style={styles.container}>
                    <Text>
                        Profile Page
                    </Text>
                <Button
                      title='Change my Password'
                      onPress={() => {
                        navigate('PwdChange')
                     }
                     } />
                <Button
                      title='Change my Email Address'
                      onPress={() => {
                        navigate('EmailChange')
                     }
                     } />
                <Button
                      title='Delete my Account'
                      onPress={() => {
                        navigate('DeleteAccount')
                     }
                     } />

                <Button 
                        title="This will log me out"
                        onPress={() => {
                            {this.logout()};
                            navigate('Login')
                         }
                         } />

                </View>
        );
    }
  }
  
  ProfilePage.navigationOptions = {
    title: 'Profile Page',
    headerStyle: {
      backgroundColor: '#f4511e',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
    headerRight: (
      <View>
        <HomeIcon />
  
      </View>
    )
  };
  


const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
  });