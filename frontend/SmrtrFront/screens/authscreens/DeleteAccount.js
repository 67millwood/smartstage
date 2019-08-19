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


export default class DeleteAccountScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            email2: '',
            }
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

    emailchange () {
      const { navigate } = this.props.navigation        

      fetch('http://localhost:8080/api/auth/emailchange', {
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

    checkandchange = () => {
      if (this.state.email == this.state.email2) {
        Alert.alert('Last Chance', 'This cannot be reversed.\nAre you 100% sure?')
        //this.emailchange();
      } else {
        Alert.alert('Ooops!', 'Those addresses don\'t match');
        this.setState({
          email: '',
          email2: '',
        })
      }
        
      }

    
    render() {
        const { navigate } = this.props.navigation        
        return (

            <View style={styles.container} >
                <Text style={styles.container}
                    style={{fontSize: 27}}>
                    Delete your account PERMANENTLY....
                </Text>
                
                <TextInput 
                    style={styles.input}
                    placeholder='Current email address'
                    autoCapitalize = 'none'
                    onChangeText={(email)=>this.setState({email})}
                    value={this.state.email}
                    secureTextEntry={true}
                />
                <TextInput 
                    style={styles.input}
                    placeholder='Re-enter curren email address'
                    autoCapitalize = 'none'
                    onChangeText={(email2)=>this.setState({email2})}
                    value={this.state.email2}
                    secureTextEntry={true}
                />

                <View style={{margin:7}}>
                <TouchableOpacity
                    style={{backgroundColor: 'red' }} 
                    onPress={this.checkandchange}
                      >
                        <Text>DELETE</Text>

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