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

export default class EmailChangeScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            email2: '',
            }
    }

    email_error = (response) => {
      
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
    }

    setUserEmail= async () => {
      try {
        await AsyncStorage.setItem('UserEmail', (`${this.state.email}`))
      } catch(e) {
        console.log('didn\'t work')
      }
    
      console.log('Done.')
    }




    emailchange = async () => {
      const { navigate } = this.props.navigation   
      const userToken = await AsyncStorage.getItem('LoginToken');
     

      fetch('http://localhost:8080/api/auth/emailchange', {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Token ${userToken}`,
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
                email2: '',
              })
      
            })        
            } else {
              response.json().then(data => {
                console.log('good change')
                this.setUserEmail();
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
      if (this.state.email == this.state.email2) {
        //Alert.alert('Change Successful!', 'Let\'s get back at it 🦄...')
        this.emailchange();
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
                    
                    Change your email....
                </Text>
                
                <TextInput 
                    style={styles.input}
                    placeholder='NEW email'
                    autoCapitalize = 'none'
                    onChangeText={(email)=>this.setState({email})}
                    value={this.state.email}
                />
                <TextInput 
                    style={styles.input}
                    placeholder='Re-enter NEW email'
                    autoCapitalize = 'none'
                    onChangeText={(email2)=>this.setState({email2})}
                    value={this.state.email2}
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


