import React, { Component, Fragment } from 'react';
import { View, StyleSheet, Text, Button, AsyncStorage } from 'react-native';


export default class ProfilePage extends Component {
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
        const { navigate, goBack } = this.props.navigation
        return (
             
            <Fragment>
                <View style={styles.container}>
                    <Text>
                        Profile Page
                    </Text>
                    <Button 
                        title="This will log me out"
                        onPress={() => {
                            {this.logout()};
                            navigate('Login')
                         }
                         } />
                    <Button 
                        title="Go Back"
                        onPress={() => {
                            
                            navigate('Belts')
                         }
                         } />

                </View>
            </Fragment>
        );
    }
  }
  


const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    userinput: {
      flex: 1,
      paddingTop: 20,

    }
  });