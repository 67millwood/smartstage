import React, { Component, Fragment } from 'react';
import {
    ScrollView,
    Text,
    TextInput,
    View,
    TouchableOpacity,
    StyleSheet,
    Button,
} from 'react-native';


export default class Register extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: ''
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
          default:
            console.log('all good')
          }
        }

      this.setState({
        email: '',
        password: '',
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
                navigate('Login')
              })
          }
        })
        .catch(console.error)
      }
    

      extrafeature = () => {
        this.registration();
      }
    
    render() {
        const { navigate } = this.props.navigation;        
        return (

              <View style={styles.container} >
                    <Text 
                    style={{fontSize: 27}}>
                    Register
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
                <View style={{margin:7}} >
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
                  onPress={() => navigate('Login')}
                  >
                  <Text style={styles.register}>Already Registered? Login</Text>
                  </TouchableOpacity>
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