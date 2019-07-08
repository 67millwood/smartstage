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
        email: '',
        password: '',
      });
    }

    setToken= async () => {
      try {
        await AsyncStorage.setItem('LoginToken', (`${this.state.token}`))
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

    
    render() {
        const { navigate } = this.props.navigation        
        return (

            <View style={styles.container} >
                <Text style={styles.container}
                    style={{fontSize: 27}}>
                    Login
                </Text>
                
                <TextInput 
                    style={styles.input}
                    placeholder='Email'
                    autoCapitalize = 'none'
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
                <View style={{margin:7}}>
                <TouchableOpacity
                    style={{backgroundColor: 'aqua' }} 
                    onPress={this.extrafeature}
                      >
                        <Text>ENTER</Text>

                </TouchableOpacity>
                </View>
                <View  style={{alignItems: 'flex-end'}}>
                  <TouchableOpacity
                  style={styles.register}
                  onPress={() => navigate('Register')}
                  >
                  <Text style={styles.register}>Register</Text>
                  </TouchableOpacity>
                </View>
                
                <View style={styles.container}>
                  <Button title="Pretend I'm Logged In" onPress={() => {navigate('Home')}} />
                </View>


            </View>
            )
    }
}


const styles = StyleSheet.create({
    input: {
      padding: 5,
      borderBottomColor: 15,
      borderBottomWidth: 1,
    },
    container: {
      flex: 1,
      marginTop: 100,
      marginLeft: 15,
      marginRight: 15,
    },
    register: {
      fontSize: 12,
      justifyContent: 'flex-start',
      marginRight: 5,
    }
  });