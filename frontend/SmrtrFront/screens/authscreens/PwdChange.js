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

export default class PwdChangeScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            password: '',
            password2: '',
            }
    }

    pwd_error = (response) => {
      
      if(response.hasOwnProperty('password')) {
        switch (response.password[0]) {
          case 'This field may not be blank.':
            alert('Missing password');
            break;
          case 'This password is entirely numeric.':
            alert('This password is entirely numeric.')
            break;
          case 'This password is too short. It must contain at least 8 characters.':
              alert('This password is too short. It must contain at least 8 characters.')
              break;
          case 'This password is too common.':
              alert('This password is too common.')
              break;

          default:
            console.log('all good')
          }
        }
      }



    pwdchange = async () => {
      const { navigate } = this.props.navigation   
      const userToken = await AsyncStorage.getItem('LoginToken');
     

      fetch('http://localhost:8080/api/auth/pwdchange', {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Token ${userToken}`,
        },
        body: JSON.stringify({
          password: this.state.password,
          }),
        })
        .then(response => {
          if(!response.ok) {
            response.json().then(data => {
              this.pwd_error(data)
              this.setState({
                password: '',
                password2: '',
              })

            })        
            } else {
              response.json().then(data => {
                console.log('good')
                Alert.alert('Change Successful!', 'Let\'s get back at it 🦄...')
                navigate('Home')
              })
            }
        })
        .catch(() => {
          console.log('this is bad');
        });
    }

    checkandchange = () => {
      if (this.state.password == this.state.password2) {
        //Alert.alert('Change Successful!', 'Let\'s get back at it 🦄...')
        this.pwdchange();
      } else {
        Alert.alert('Ooops!', 'Those passwords don\'t match');
        this.setState({
          password: '',
          password2: '',
        })
      }
        
      }

    
    render() {
        const { navigate } = this.props.navigation        
        return (

            <View style={{...styles.container, marginTop: 5 }}>
              <View style={styles.userActivity2}>
                <Text style={{fontSize: 27}}>
                    Change your password....
                </Text>
                
                <TextInput 
                    style={styles.input}
                    placeholder='NEW Password'
                    autoCapitalize = 'none'
                    onChangeText={(password)=>this.setState({password})}
                    value={this.state.password}
                    secureTextEntry={true}
                />
                <TextInput 
                    style={styles.input}
                    placeholder='Re-enter NEW Password'
                    autoCapitalize = 'none'
                    onChangeText={(password2)=>this.setState({password2})}
                    value={this.state.password2}
                    secureTextEntry={true}
                />

                <TouchableOpacity
                    style={styles.inputButton} 
                    onPress={this.checkandchange}
                      >
                        <Text style={{ fontSize: 25 }}>ENTER</Text>

                </TouchableOpacity>
              </View>


            </View>
            )
    }
}


