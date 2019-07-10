import React, { Component, Fragment } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, AsyncStorage, FlatList } from 'react-native';
import ProfileIcon from '../navigation/ProfileIcon';



export default class BeltsScreen extends Component {
  constructor(){
    super();
    this.state = {
      datasource: []
    }
  }


  getallbelts = async () => {
    const userToken = await AsyncStorage.getItem('LoginToken');
    console.log(userToken)

    try {
        return fetch('http://localhost:8080/api/userbelts/', {
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
              console.log(data)
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
    <Text>User: {item.user}, Belt Level: {item.belt_level}</Text>
  );


  render() {
    return (
      <View>
        <TouchableOpacity
        style={{backgroundColor: 'aqua' }} 
        onPress={this.getallbelts}
          >
            <Text>Give me Belts</Text>
        </TouchableOpacity>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
});
