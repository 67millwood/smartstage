import React, { Component } from 'react';
import {
    Text,
    View,
    AsyncStorage,

} from 'react-native';

export default class QuestionCountdown extends Component {
    constructor(props) {
        super(props);
        this.state = {
            countdown: null,      
          }    
    }

    componentDidMount() {
          this.checkCountdown();
        };
        
      
// checks if questions are available
checkCountdown = async () => {
  
    const userToken = await AsyncStorage.getItem('LoginToken');
    console.log(userToken)
  
    try {
        return fetch(('http://localhost:8080/api/dailylimit'), {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Token ${userToken}`,
          },
      })
      .then(response => {
        if(!response.ok) {
          console.log('crap')      
          } else {
            response.json().then(data => {
              this.setState({
                countdown: data.appdelay
              }
              )
              console.log(data)
            })
        }
      })
      }
    catch(error) {
      console.log('something went wrong');
    };
  }

  render() {
      if (this.state.countdown == null) {
      return (
          <View>
            <Text>go ahead</Text>
          </View>  
      )
      }
      else {
          return (
            <View>
            <Text>
                {this.state.countdown}
            </Text>
            </View>  

          )
      }
  }
}