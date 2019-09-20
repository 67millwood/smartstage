import React, { Component, Fragment } from 'react';
import {
    Text,
    TextInput,
    View,
    TouchableOpacity,
    StyleSheet,
    AsyncStorage,
    Button,
    Alert,
} from 'react-native';

import { styles } from '../Mainstyles/authstyles';


export default class DeleteAccountScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            email2: '',
            }
    }


    deleteaccount = async () => {
      const { navigate } = this.props.navigation   
      const userToken = await AsyncStorage.getItem('LoginToken');
     

      fetch('http://localhost:8080/api/auth/deleteaccount', {
        method: 'DELETE',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Token ${userToken}`,
        }
        })
        .then(response => {
          if(!response.ok) {
            response.json().then(data => {
              console.log('response bad')
            })        
            } else {
              response.json().then(data => {
                console.log('good')
                AsyncStorage.removeItem('UserEmail')
                this.logout()
                navigate('Login')
              })
              
            }
        })
        .catch(() => {
          console.log('this is bad');
        });
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


    checkandchange = () => {
      if (this.state.email == this.state.email2) {
        Alert.alert('Deletion Successful!')
        this.deleteaccount();
      } else {
        Alert.alert('Ooops!', 'Those emails don\'t match');
        this.setState({
          email: '',
          email2: '',
        })
      }
        
      }

    
    render() {
        const { navigate } = this.props.navigation        
        return (

            <View style={{...styles.container, marginTop: 5 }}>
              <View style={styles.userActivity2}>

                <Text style={{fontSize: 27}}>
                    Delete your account....
                </Text>
                
                <TextInput 
                    style={styles.input}
                    placeholder='enter email address'
                    autoCapitalize = 'none'
                    onChangeText={(email)=>this.setState({email})}
                    value={this.state.email}
                />
                <TextInput 
                    style={styles.input}
                    placeholder='Re-enter email'
                    autoCapitalize = 'none'
                    onChangeText={(email2)=>this.setState({email2})}
                    value={this.state.email2}
                />

                <TouchableOpacity
                    style={{ ...styles.inputButton, backgroundColor: 'red' }} 
                    onPress={this.checkandchange}
                      >
                        <Text style={{ fontSize: 25 }}>Delete</Text>

                </TouchableOpacity>
              </View>


            </View>
            )
    }
}


