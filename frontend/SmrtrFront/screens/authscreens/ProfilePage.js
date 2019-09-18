import React, { Component } from 'react';
import { View, StyleSheet, Text, Button, AsyncStorage } from 'react-native';

import HomeIcon from '../../navigation/HomeIcon';

import { styles } from '../Mainstyles/authstyles';

export default class ProfilePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
    }
  }

  componentDidMount() {
    const { navigation } = this.props;
    this.focusListener = navigation.addListener("didFocus", () => {
      // The screen is focused
      this.getUserInfo();
    });
  }
  
  componentWillUnmount() {
      // Remove the event listener
      this.focusListener.remove();
    }
  



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

    getUserInfo = async () => {
      const userToken = await AsyncStorage.getItem('LoginToken');

      fetch('http://localhost:8080/api/auth/user', {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Token ${userToken}`,
        }
        })
        .then(response => {
          if(!response.ok) {
            console.log('not ok')      
            } else {
              response.json().then(data => {
                this.setState({
                  email: data['email']
                })
              })
            }
        })
        .catch(() => {
          console.log('this is bad');
        });
    }


    render() {
        const { navigate } = this.props.navigation
        return (
             
            <View style={{...styles.container, marginTop: 5 }}>
              <View style={{...styles.userActivity, justifyContent: 'center'}}>
                <Text style={{ textAlign: 'center'}}>
                  {this.state.email}
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
  


