import React, { Component, Fragment } from 'react';
import { 
  View, 
  StyleSheet, 
  Text, 
  TouchableOpacity, 
  AsyncStorage, 
  Button, 
} from 'react-native';


import { styles } from '../Mainstyles/mainstyle';

export default class AccuracyDetailsScreen extends Component {
  constructor(){
    super();
    this.state = {
      accuracy: 0,
      attempts: 0,
      correct: 0,
    
    }
  }

  componentDidMount() {
    const { navigation } = this.props;
    this.focusListener = navigation.addListener("didFocus", () => {
      // The screen is focused
      this.getAnalytics();
  });
}

  componentWillUnmount() {
    // Remove the event listener
    this.focusListener.remove();
  }



  getAnalytics = async () => {
    const userToken = await AsyncStorage.getItem('LoginToken');

    try {
        return fetch('http://localhost:8080/api/accuracy', {
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
              //console.log(data)
              this.setState({
                accuracy: data.crticialaccuracy,
                attempts: data.critical,
                correct: data.criticalcorrect,
              }
              )
            })
        }
      })}
    catch(error) {
      console.log('no analysis coming');
    };
  }




  render() {
    const { navigate } = this.props.navigation

    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <Text style={styles.mainlineText}>
            Attempts: {this.state.attempts}
            {"\n"}
            Correct: {this.state.correct}
            {"\n"}
            Accuracy: {this.state.accuracy}%
          </Text>
        </View>
    );
  }

  
}





