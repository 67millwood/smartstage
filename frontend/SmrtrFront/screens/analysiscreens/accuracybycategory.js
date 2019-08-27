import React, { Component, Fragment } from 'react';
import { 
  View, 
  StyleSheet, 
  Text, 
  TouchableOpacity, 
  AsyncStorage, 
  Button,
  FlatList, 
} from 'react-native';


import { styles } from '../Mainstyles/mainstyle';

export default class AccuracyDetailsScreen extends Component {
  constructor(){
    super();
    this.state = {
        category_stats: [],
    
    }
  }

  componentDidMount() {
    const { navigation } = this.props;
    this.focusListener = navigation.addListener("didFocus", () => {
      // The screen is focused
      this.getCategoryAccuracy();
  });
}

  componentWillUnmount() {
    // Remove the event listener
    this.focusListener.remove();
  }



  getCategoryAccuracy = async () => {
    const userToken = await AsyncStorage.getItem('LoginToken');

    try {
        return fetch('http://localhost:8080/api/accuracy/bycategory', {
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
                category_stats: data,
              }
              )
            })
        }
      })}
    catch(error) {
      console.log('no details coming');
    };
  }

  renderlist = ({ item }) => (
    
    <View>
      <TouchableOpacity style={ {...styles.belt, backgroundColor: `${item.color}`} }
        >
          <Text style={styles.percentCompleteText}>
            {item.category}
            {"\n"}
            Attempted: {item.answered}
            {"\n"}
            Correct: {item.correct}
            {"\n"}
            Accuracy:  {item.accuracy}%
            {"\n"}
          </Text>
          
      </TouchableOpacity>
    </View>
  );





  render() {
    const { navigate } = this.props.navigation

    return (
          <View style={styles.beltContainer}>
                <FlatList
                data={this.state.category_stats}
                renderItem={this.renderlist}
                keyExtractor={(item) => String(item.category)}
                />
          </View>
    );
  }

  
}





