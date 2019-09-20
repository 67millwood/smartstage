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


export default class ResetPasswordScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            }
    }

    email_error = (response) => {
      
      if(response.hasOwnProperty('email')) {
      switch (response.email[0]) {
        case 'This field may not be blank.':
          alert('Missing email');
          break;
        case 'There is no active user associated with this e-mail address or the password can not be changed':
          alert('That email is not in our database.')
          break;
        case 'Enter a valid email address.':
          alert('We need a valid email address.')
          break;
        default:
          console.log('all good')
        }
      }
    }



    resetPassword = async () => {
      const { navigate } = this.props.navigation   
     

      fetch('http://localhost:8080/api/password_reset/', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: this.state.email,
          }),
        })
        .then(response => {
          if(!response.ok) {
            response.json().then(data => {
              this.email_error(data)
              this.setState({
                email: '',
              })
      
            })        
            } else {
              response.json().then(data => {
                console.log('token sent')
                Alert.alert('Thanks', 'An email with instructions to reset your password has been sent.')
                navigate('ResetToken')
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

            <View style={styles.container } >
              <View style={styles.userActivity2}>
                <Text style={{fontSize: 30}}>
                    Forgot your pwd?! 🙁
                </Text>
                
                <TextInput 
                    style={styles.input}
                    placeholder='enter your registered email'
                    autoCapitalize = 'none'
                    onChangeText={(email)=>this.setState({email})}
                    value={this.state.email}
                />
                <TouchableOpacity
                    style={styles.inputButton} 
                    onPress={this.resetPassword}
                      >
                        <Text style={{ fontSize: 25 }}>ENTER</Text>

                </TouchableOpacity>
                
                <View  style={{alignItems: 'flex-end'}}>
                  <TouchableOpacity
                  style={styles.register}
                  onPress={() => navigate('ResetToken')}
                  >
                  <Text style={styles.register}>Have token already?</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            )
    }
}


