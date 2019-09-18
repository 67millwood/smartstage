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


export default class ResetTokenScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            token: '',
            new_password: '',
            new_password2: '',
            }
    }

    reset_error = (response) => {
      
      if(response.hasOwnProperty('password')) {
      switch (response.password[0]) {
        case 'This field may not be blank.':
          alert('Missing password');
          break;
        case 'This password is too short. It must contain at least 8 characters.':
          alert('That password is too short')
          break;
        case 'The password is too similar to the email address.':
            alert('The password is too similar to the email address.')
            break;
  
        default:
          console.log('all good')
        }
      }

      if(response.hasOwnProperty('status')) {
            switch (response.status[0]) {
                case 'notfound':
                alert('We can\'t find that token', 'Please try again or check your email.');
                break;
                default:
                console.log('all good')
                }
            }

      this.setState({
        token: '',
        new_password: '',
        new_password2: '',
      })

    }



    resetPassword = async () => {
      const { navigate } = this.props.navigation   
     

      fetch('http://localhost:8080/api/password_reset/confirm/', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          token: this.state.token,
          password: this.state.new_password,
          }),
        })
        .then(response => {
          if(!response.ok) {
            response.json().then(data => {
              this.reset_error(data)
            })        
            } else {
              response.json().then(data => {
                console.log('token sent')
                Alert.alert('Great', 'Your password has been reset.  Please login.')
                navigate('Login')
              })
            }
        })
        .catch(() => {
          console.log('this is bad');
        });
    }

    checkandchange = () => {
        if (this.state.new_password == this.state.new_password2) {
          this.resetPassword();
        } else {
          Alert.alert('Ooops!', 'Those passwords don\'t match');
          this.setState({
            new_password: '',
            new_password2: '',
          })
        }
          
        }
  
    
    render() {
        const { navigate } = this.props.navigation        
        return (

            <View style={styles.container} >
              <View style={{...styles.userActivity, justifyContent: 'center'}}>

                <Text style={{fontSize: 27}}>
                    Create a new password....
                </Text>
                
                <TextInput 
                    style={styles.input}
                    placeholder='token you received via email'
                    autoCapitalize = 'none'
                    onChangeText={(token)=>this.setState({token})}
                    value={this.state.token}
                />
                <TextInput 
                    style={styles.input}
                    placeholder='enter new password'
                    autoCapitalize = 'none'
                    onChangeText={(new_password)=>this.setState({new_password})}
                    value={this.state.new_password}
                    secureTextEntry={true}

                />
                <TextInput 
                    style={styles.input}
                    placeholder='re-enter new password'
                    autoCapitalize = 'none'
                    onChangeText={(new_password2)=>this.setState({new_password2})}
                    value={this.state.new_password2}
                    secureTextEntry={true}

                />
                <TouchableOpacity
                    style={styles.inputButton} 
                    onPress={this.checkandchange}
                      >
                        <Text style={{ fontSize: 25 }}>ENTER</Text>

                </TouchableOpacity>
                <View  style={{alignItems: 'flex-end'}}>
                  <TouchableOpacity
                  style={styles.register}
                  onPress={() => navigate('Login')}
                  >
                  <Text style={styles.register}>Return to Login</Text>
                  </TouchableOpacity>
                </View>
              </View>

                


            </View>
            )
    }
}


