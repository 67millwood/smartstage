import React, { Component, Fragment } from 'react';
import {
    Text,
    TextInput,
    View,
    TouchableOpacity,
    Alert,
    AsyncStorage,
    Button,
} from 'react-native';

import { styles } from '../Mainstyles/authstyles';

export default class Register extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: '',
            password2: '',
            }
        this.registration=this.registration.bind(this);
    }

    registration_error = (response) => {
      
      if(response.hasOwnProperty('email')) {
      switch (response.email[0]) {
        case 'This field may not be blank.':
          alert('Missing email');
          break;
        case 'A user with that email address already exists.':
          alert('User exists')
          break;
        case 'Enter a valid email address.':
          alert('We need a valid email address')
          break;
        default:
          console.log('all good')
        }
      }
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

      this.setState({
        password: '',
        password2: '',
      });
    }

    registration () {
      const { navigate } = this.props.navigation        

        fetch('http://localhost:8080/api/auth/register', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: this.state.email,
            password: this.state.password,
          }),
        })
        .then(response => {
          if(!response.ok) {
            response.json().then(data => {
              this.registration_error(data)
            })        
            } else {
              response.json().then(data => {
                console.log(data)
                Alert.alert('You\'re Registered!', `Please login as ${this.state.email}.`)
                this.setEmail();
                navigate('Login')
              })
          }
        })
        .catch(console.error)
      }
    

      checkandchange = () => {
        if (this.state.password == this.state.password2) {
          this.registration();
        } else {
          Alert.alert('Ooops!', 'Those passwords don\'t match');
          this.setState({
            password: '',
            password2: '',
          })
        }
          
        }

        setEmail= async () => {
          try {
            await AsyncStorage.setItem('UserEmail', (`${this.state.email}`))
          } catch(e) {
            console.log('didn\'t work at point of registration')
          }
        
          console.log('Done.')
        }
    
  
    
    render() {
        const { navigate } = this.props.navigation;        
        return (

              <View style={styles.container} >
                <View style={{ flex: 1, marginLeft: 5 }}>
                  <Text style={styles.title}>
                    Welcome...{'\n'}Smrtr.life
                  </Text>
                </View>

                <View style={styles.userActivity}>
                  <Text style={{fontSize: 30}}>
                      Register
                  </Text>
                <TextInput 
                    style={styles.input}
                    placeholder='Email'
                    autoCapitalize = 'none'
                    clearButtonMode = 'always'
                    onChangeText={(email)=>this.setState({email})}
                    value={this.state.email}
                />
                <TextInput 
                    style={styles.input}
                    placeholder='Password'
                    autoCapitalize = 'none'
                    onChangeText={(password)=>this.setState({password})}
                    value={this.state.password}
                    secureTextEntry={true}
                />
                <TextInput 
                    style={styles.input}
                    placeholder='Re-enter Password'
                    autoCapitalize = 'none'
                    onChangeText={(password2)=>this.setState({password2})}
                    value={this.state.password2}
                    secureTextEntry={true}
                />

                <View style={{margin:7}} >
                <TouchableOpacity
                    style={styles.inputButton} 
                    onPress={this.checkandchange}
                      >
                        <Text style={{ fontSize: 25 }}>ENTER</Text>

                </TouchableOpacity>
                </View>
                <View  style={{alignItems: 'flex-end'}}>
                  <TouchableOpacity
                  style={styles.register}
                  onPress={() => navigate('Login')}
                  >
                  <Text style={styles.register}>Already Registered? Login</Text>
                  </TouchableOpacity>
                </View>
                </View>
              </View>

            )
    }
}


