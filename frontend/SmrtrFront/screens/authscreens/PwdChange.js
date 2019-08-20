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


export default class PwdChangeScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            password: '',
            password2: '',
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
          new_password: this.state.password,
          }),
        })
        .then(response => {
          if(!response.ok) {
            response.json().then(data => {
              console.log('response bad')
            })        
            } else {
              response.json().then(data => {
                console.log('good')
                navigate('Login')
              })
            }
        })
        .catch(() => {
          console.log('this is bad');
        });
    }

    checkandchange = () => {
      if (this.state.password == this.state.password2) {
        Alert.alert('Change Successful!', 'Please login again...')
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

            <View style={styles.container} >
                <Text style={styles.container}
                    style={{fontSize: 27}}>
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

                <View style={{margin:7}}>
                <TouchableOpacity
                    style={{backgroundColor: 'aqua' }} 
                    onPress={this.checkandchange}
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