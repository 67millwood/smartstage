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

export default class BreadthDetailsScreen extends Component {
  constructor(){
    super();
    this.state = {
        category_breadth: [],
    
    }
  }

  componentDidMount() {
    const { navigation } = this.props;
    this.focusListener = navigation.addListener("didFocus", () => {
      // The screen is focused
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
          console.log('crap')      
          } else {
            response.json().then(data => {
              //console.log(data)
              this.setState({
                category_breadth: data.breadth_data,
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
          <Text style={styles.subTitle}>
          {item.category}
          </Text>

          <Text style={styles.percentCompleteText}>
            Percent of questions attempted: {item.percent_attempts}%
            {"\n"}
            Breadth Rating: {" "}
            <Text style={{fontWeight: 'bold', color: 'red'}}>
             {item.categoryrating}
            </Text>
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
                data={this.state.category_breadth}
                renderItem={this.renderlist}
                keyExtractor={(item) => String(item.category)}
                />
          </View>
    );
  }

  
}





