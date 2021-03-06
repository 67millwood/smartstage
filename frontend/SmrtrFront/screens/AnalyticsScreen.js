import React, { Component, Fragment } from 'react';
import { 
  View, 
  StyleSheet, 
  Text, 
  TouchableOpacity, 
  AsyncStorage, 
  Button, 
} from 'react-native';

import ProfileIcon from '../navigation/ProfileIcon';

import { styles } from '../screens/Mainstyles/mainstyle';

export default class Analytics extends Component {
  constructor(){
    super();
    this.state = {
      accuracy: 0,
      attempts: 0,
      correct: 0,
      overall_breadth: '',
      short_term: '',
      medium_term: '',
      long_term: '',
    
    }
  }

  componentDidMount() {
    const { navigation } = this.props;
    this.focusListener = navigation.addListener("didFocus", () => {
      // The screen is focused
      this.getAccuracy();
      this.getConsistency();
      this.getCategoryBreadth();
  });
}

  componentWillUnmount() {
    // Remove the event listener
    this.focusListener.remove();
  }

  getCategoryBreadth = async () => {
    const userToken = await AsyncStorage.getItem('LoginToken');

    try {
        return fetch('http://localhost:8080/api/breadth', {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Token ${userToken}`,
          },
      })
      .then(response => {
        if(!response.ok) {
          console.log('breadth crap')      
          } else {
            response.json().then(data => {
              //console.log(data)
              this.setState({
                overall_breadth: data.answer_deviation,
              }
              )
            })
        }
      })}
    catch(error) {
      console.log('no details coming');
    };
  }

  getConsistency = async () => {
    const userToken = await AsyncStorage.getItem('LoginToken');

    try {
        return fetch('http://localhost:8080/api/consistency', {
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
                  short_term: data.short_term,
                  medium_term: data.medium_term,
                  long_term: data.long_term,
                  }
              )
            })
        }
      })}
    catch(error) {
      console.log('no analysis coming');
    };
  }

  getAccuracy = async () => {
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
                accuracy: data.accuracy,
                attempts: data.all_attempts,
                correct: data.correct,
              }
              )
            })
        }
      })}
    catch(error) {
      console.log('no analysis coming');
    };
  }


  static navigationOptions = () => {
    return {
    title: 'Analytics',
    headerStyle: {
      backgroundColor: '#f4511e',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
    headerRight: (
      <View>
        <ProfileIcon />
      </View>
    )
    }}


  render() {
    const { navigate } = this.props.navigation

    // conditional rendering if user has no questions yet

    let breadthinfo;
    if (this.state.overall_breadth != 'No data yet...') {
      breadthinfo = <Button
                      title="Breadth by Category"
                      onPress={() => {
                        navigate('BreadthDetails')}
                      }
                    />
                    }
    
    let accuracyinfo;
    if (this.state.accuracy != 'No data yet...') {
      accuracyinfo =
                    <View> 
                    <Text style={styles.mainlineText}>
                    Attempts: {this.state.attempts}
                    {"\n"}
                    Correct: {this.state.correct}
                    {"\n"}
                    Overall Accuracy: {this.state.accuracy}%
                    </Text>
                    <Button
                      title="Accuracy by Category"
                      onPress={() => {
                        navigate('AccuracyDetails')}
                      }
                    />
                    </View>
                    } else {
                    accuracyinfo = 
                    <Text style={styles.mainlineText}>
                    Overall Accuracy: {this.state.accuracy}
                    </Text>
                    }
    let consistencyinfo;
    if (this.state.accuracy != 'No data yet...') {
      consistencyinfo =
                    <Text style={styles.mainlineText}>
                      Short Term: {this.state.short_term}
                      {"\n"}
                      Medium Term: {this.state.medium_term}
                      {"\n"}
                      Long Term: {this.state.long_term}
                    </Text>
                    } else {
                    consistencyinfo = 
                    <Text style={styles.mainlineText}>
                    Consistency: No data yet...
                    </Text>
                    }
                
    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          
          <Text style={styles.subTitle}>
            Breadth
          </Text>

          <Text style={styles.mainlineText}>
            Overall Breadth: {this.state.overall_breadth}
          </Text>

          {breadthinfo}
          
          <Text style={styles.subTitle}>
            Consistency
          </Text>
          {consistencyinfo}

          <Text style={styles.subTitle}>
            Accuracy
          </Text>

          {accuracyinfo}

        </View>
    );
  }

  
}





