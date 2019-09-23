import React, { Component, Fragment } from 'react';
import {
    Text,
    TextInput,
    View,
    TouchableOpacity,
    StyleSheet,
    AsyncStorage,
    Button,
} from 'react-native';

import { styles } from '../Mainstyles/authstyles';


export default class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: '',
            token: '',
            }
        this.logintobackend=this.logintobackend.bind(this);
    }

    login_error = (response) => {
      console.log(response)
      
      if(response.hasOwnProperty('email')) {
      switch (response.email[0]) {
        case 'This field may not be blank.':
          alert('Missing email');
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
          default:
            console.log('all good')
          }
        }
      
      if(response.hasOwnProperty('non_field_errors')) {
        switch (response.non_field_errors[0]) {
          case 'Nope':
            alert('Sorry.  That\'s not a valid email/password.');
            break;
          default:
            console.log('all good')
          }
        }
      this.setState({
        password: '',
      });
    }

  //event listener runs any function when page 'didFocus' or reloads
  componentDidMount() {
    const { navigation } = this.props;
    this.focusListener = navigation.addListener("didFocus", () => {
      // The screen is focused
      this.getUserEmail();
    });
  }

  componentWillUnmount() {
    // Remove the event listener
    this.focusListener.remove();
  }

    setToken= async () => {
      try {
        await AsyncStorage.setItem('LoginToken', (`${this.state.token}`))
        await AsyncStorage.setItem('UserEmail', (`${this.state.email}`))
      } catch(e) {
        console.log('didn\'t work')
      }
    
      console.log('Done.')
    }

    logintobackend () {
      const { navigate } = this.props.navigation        

      fetch('http://localhost:8080/api/auth/login', {
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
              this.login_error(data)
            })        
            } else {
              response.json().then(data => {
                //console.log(data.token);
                this.setState({ token: data.token })
                console.log(this.state.token)
                this.setToken()
                navigate('Home')
              })
            }
        })
        .catch(() => {
          console.log('this is bad');
        });
    }

      extrafeature = () => {
        this.logintobackend();
      }

      getUserEmail = async () => {
        try {
          const userEmail = await AsyncStorage.getItem('UserEmail');
          if (userEmail !== null) {
            this.setState({
              email: userEmail,
            })
          } else {
            console.log('no email there')
          }
        } catch (error) {
          console.log(Math.random());
        }
      }
      

    
    render() {
        const { navigate } = this.props.navigation        
        return (

            <View style={styles.container} >
              <View style={{ flex: 1, marginLeft: 5 }}>
                <Text style={styles.title}>
                  Welcome...{'\n'}Smrtr.life
                </Text>
              </View>
              <View style={styles.userActivity}>
                <Text style={{fontSize: 30}}>
                    Login
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
                <TouchableOpacity
                    style={styles.inputButton} 
                    onPress={this.extrafeature}
                      >
                        <Text style={{ fontSize: 25 }}>ENTER</Text>

                </TouchableOpacity>
                <View  style={{alignItems: 'flex-end'}}>
                  <TouchableOpacity
                  style={styles.register}
                  onPress={() => navigate('Register')}
                  >
                  <Text style={styles.register}>Register</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                  style={styles.register}
                  onPress={() => navigate('Forgot')}
                  >
                  <Text style={styles.register}>Forgot?</Text>
                  </TouchableOpacity>
                </View>
              </View>

            </View>
            )
    }
}


