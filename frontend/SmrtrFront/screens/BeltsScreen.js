import React, { Component } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, AsyncStorage, FlatList } from 'react-native';
import ProfileIcon from '../navigation/ProfileIcon';

import { styles } from '../screens/Mainstyles/mainstyle';

export default class BeltsScreen extends Component {
  constructor(){
    super();
    this.state = {
      datasource: [],
    
    }
  }

  componentDidMount() {
    const { navigation } = this.props;
    this.focusListener = navigation.addListener("didFocus", () => {
      // The screen is focused
      this.getallbelts();
  });
}

  componentWillUnmount() {
    // Remove the event listener
    this.focusListener.remove();
  }



  getallbelts = async () => {
    const userToken = await AsyncStorage.getItem('LoginToken');
    console.log(userToken)

    try {
        return fetch('http://localhost:8080/api/singleuserbelts', {
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
                datasource: data
              }
              )
            })
        }
      })}
    catch(error) {
      console.log('no belts coming');
    };
  }

  renderlist = ({ item }) => (
    
    <View>
          <Text style={styles.percentCompleteText}>    
          {item.belt_level.belt_name} is {item.percent_complete} percent complete:
          </Text>

      <TouchableOpacity 
        style={ {...styles.belt, backgroundColor: `${item.belt_level.belt_color}`} }>
          <Text style={styles.percentCompleteText}>
            Notches Earned: {item.notches_complete}
            {"\n"}
            {item.percent_complete >= 100 ? `🦋🦋Nice Work!🦋🦋\nCompleted: ${item.belt_complete_date}` : ''}
            {"\n"}
            

            {"\n"}
          </Text>
          <Text style={styles.smallerBeltText}>
            (required: {item.belt_level.belt_notches})
          </Text>
          
      </TouchableOpacity>
    </View>
  );

  finishedbelt = (data) => {
    if (data >= 100) {
      return 'This belt is done. 🦋'
    } else {
      return `This belt ${data}% complete`
    }
  }


  render() {
    return (
      <View style={styles.beltContainer}>
        <FlatList
        data={this.state.datasource}
        renderItem={this.renderlist}
        keyExtractor={(item) => String(item.id)}
        />
      </View>
    );
  }
}

BeltsScreen.navigationOptions = {
  title: 'Belts Screen',
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
};

