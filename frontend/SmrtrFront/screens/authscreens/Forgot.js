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

            <View style={styles.container} >
                <Text style={styles.container}
                    style={{fontSize: 27}}>
                    Enter your email....
                </Text>
                
                <TextInput 
                    style={styles.input}
                    placeholder='email registered with Smrtr.life'
                    autoCapitalize = 'none'
                    onChangeText={(email)=>this.setState({email})}
                    value={this.state.email}
                />

                <View style={{margin:7}}>
                <TouchableOpacity
                    style={{backgroundColor: 'aqua' }} 
                    onPress={this.resetPassword}
                      >
                        <Text>ENTER</Text>

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