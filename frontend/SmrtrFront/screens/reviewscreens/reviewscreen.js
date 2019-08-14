import React, { Component } from 'react';
import {
    Text,
    View,
    Button,
    AsyncStorage,
    FlatList,
    TouchableOpacity,
} from 'react-native';
import HomeIcon from '../../navigation/HomeIcon';
import { styles } from './reviewstyles';

export default class ReviewScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
          readings: [],
          category: '',
          pagecount: 0,
        }
    }

    static navigationOptions = ({ navigation }) => {
        return {
          title: navigation.getParam('otherParam', 'A Nested Details Screen'),
          headerStyle: {
            backgroundColor: navigation.getParam('color', 'white'),
          },
          headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        headerLeft: (
          <View>
            <HomeIcon />
          </View>
        )
        }}
    
    // getCategory sets the state.category
    // getReadings calls the api and gets an object with 4 readings in the correct Category
    componentDidMount() {
      const { navigation } = this.props;
      this.focusListener = navigation.addListener("didFocus", () => {
        // The screen is focused
        this.getReadings();
      });
    }
    
    componentWillUnmount() {
        // Remove the event listener
        this.focusListener.remove();
      }
    
    // gets the readings via the api
    getReadings = async () => {
      const category = await AsyncStorage.getItem('category');
      this.setState({category: category})

      const category_id = await AsyncStorage.getItem('category_id');
      console.log(category_id)

      const userToken = await AsyncStorage.getItem('LoginToken');
      console.log(userToken)
  
      try {
          return fetch(('http://localhost:8080/api/readings?category=' + category_id), {
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
                  readings: data
                }
                )
              })
          }
        })}
      catch(error) {
        console.log('no readings coming');
      };
    }

    // takes the object with 4 reading blocks, breaks into a list
    // feeds the page one reading at a time based on state.pagecount
    singleReading = () => {
      const readings = this.state.readings
      const listed = []
      readings.forEach(function(item) {
        const reading = item.reading_text
        listed.push(reading)
      })
      return listed[this.state.pagecount]
    }
    
    // click handler when user clicks 'next' increases state.pagecount
    // ends after readings are done by navigating to final page of review
    pageTurn = () => {
      const { navigate } = this.props.navigation        

      if (this.state.pagecount == 3) {
        navigate('ReviewFinal', {
          title: this.state.category,
          headercolor: this.props.navigation.getParam('color', 'white'),
          }
        )
      } else {
        this.setState({ pagecount: this.state.pagecount + 1})
        
        
      }
    }
  
    
    render() {
        const { navigate } = this.props.navigation
          
        return (
            <View style={styles.readingBox}>
                <Text style={styles.readingText}>
                  {this.singleReading()}
                </Text>
                <Button
                title='Next'
                onPress={() => {
                  this.pageTurn()}
                }
                />
            </View>
            )
    }



}
