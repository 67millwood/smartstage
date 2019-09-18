import React, { Component } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  AsyncStorage,
  Dimensions,
  TouchableOpacity,
} from 'react-native';


import ProfileIcon from '../navigation/ProfileIcon';

import Carousel from 'react-native-snap-carousel';

const data = [
  {title: 'Critical Thinking', backgroundColor: 'red', category_id: 1},
  {title: 'Human Behaviour', backgroundColor: 'blue', category_id: 2},
  {title: 'Technology', backgroundColor: 'green', category_id: 3},
  {title: 'Finance', backgroundColor: 'cornflowerblue', category_id: 4},
];

const {width} = Dimensions.get('window');


export default class HomeScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
        category: '',
        category_id: null,
        countdown: null,
        hours: null,
        minutes: null,
        }
  }



  //event listener runs any function when page 'didFocus' or reloads
  componentDidMount() {
    const { navigation } = this.props;
    this.focusListener = navigation.addListener("didFocus", () => {
      // The screen is focused
      printMyToken();
      this.checkCountdown();
    });
  }

  componentWillUnmount() {
    // Remove the event listener
    this.focusListener.remove();
  }

  checkCountdown = async () => {
  
    const userToken = await AsyncStorage.getItem('LoginToken');
  
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
              if (this.state.countdown != null) {
                this.setState({
                  hours: Math.floor(data.appdelay / 3600),
                  minutes: Math.floor(data.appdelay % 3600 / 60),
                })
              }
              //console.log(data)
              //console.log(this.state.countdown)
            })
        }
      })
      }
    catch(error) {
      console.log('something went wrong');
    };
  }


  

  //Method for carosel
  renderItem = ({item, index}) => {
    const {title, backgroundColor, category_id} = item;
    const { navigate } = this.props.navigation        


    return (
        <TouchableOpacity 
          style={[styles.item, {backgroundColor}]} >
              <Text style={styles.text}>{title}</Text>
              <TouchableOpacity
                    style={{flex: 1, width: 210, backgroundColor: 'aqua' }} 
                    onPress={() => {
                      this.setState({ category: {title}})
                      this.setState({ category_id: {category_id}})
                      this.props.navigation.navigate('Question', {
                        color: backgroundColor,
                        otherParam: title,
                      });
                    }
                    }
                      >
                        <Text style={styles.sections}>Questions</Text>

                </TouchableOpacity>

              <TouchableOpacity
                    style={{flex: 1, width: 210, backgroundColor: 'cadetblue', marginBottom: 5 }} 
                    onPress={() => {
                      this.setState({ category: {title}})
                      this.setState({ category_id: {category_id}})
                      this.props.navigation.navigate('Review', {
                        color: backgroundColor,
                        otherParam: title,
                      });
                    }
                    }
                      >
                        <Text style={styles.sections}>Review</Text>

                </TouchableOpacity>
        </TouchableOpacity>)
  };

  componentDidUpdate = () => {
    this.setcategory();
  }

  setcategory = async () => {
    const { navigate } = this.props.navigation        
    try {
      await AsyncStorage.setItem('category', (`${this.state.category.title}`))
      await AsyncStorage.setItem('category_id', (`${this.state.category_id.category_id}`))

    } catch (e){
      //errors go here

    }
    //navigate('Question')
  }


  render() {
   if (this.state.countdown == null) {
      return (
            <View style={styles.contentContainer}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.getStartedText}>
                    Smrtr.life
                  </Text>
                </View>
            
            <View style={{ flex: 7, backgroundColor: '#F5F5DC', marginTop: 50}}>
                <Carousel  style={styles.carousel}
                    data={data}
                    renderItem={this.renderItem}
                    itemWidth={225}
                    enableSnap={true}
                    sliderWidth={width - 20} 
                    ref={(c) => {
                        this._carousel = c;
                    }}
                />
            </View>
            <Text>
              
            </Text>
            </View>
      )
      
                  }
      else {
        return (
          <View style={styles.contentContainer}>
          
          <Text style={styles.getStartedText}>
            Smrtr.life
          </Text>
          <View style={styles.countdowntext}>
            <Text style={{ textAlign: 'center', fontSize: 20, marginLeft: 5, marginRight: 5 }}>
              You've been doing a great job but it's good to take a break.
              More readings and questions will be available in:
            </Text>
          </View>
          <Text style={styles.countdownclock}>
          {this.state.hours} hours
          {"\n"}
          {this.state.minutes} minutes
          </Text>
          </View>

        )
      }
      
    }
}

printMyToken = async () => {
  try {
    const value = await AsyncStorage.getItem('LoginToken');
    if (value !== null) {
      console.log(value);
    } else {
      console.log('not an error but we not got it')
    }
  } catch (error) {
    console.log(Math.random());
  }
}

HomeScreen.navigationOptions = {
  headerStyle: {
    borderBottomWidth: 0,
  },  
  headerRight: (
    <View>
      <ProfileIcon />

    </View>
  )
  }



const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    backgroundColor: '#F5F5DC',
    paddingTop: 20,
  },
  getStartedText: {
    marginTop: 15,
    fontSize: 25,
    fontFamily: 'open-sans-regular',
    color: 'blueviolet',
    textAlign: 'center',
  },
  countdownclock: {
    textAlign: 'center',
    fontSize: 40,
    flex: 2,

  },
  countdowntext: {
    flex: 2,
    backgroundColor: 'red',
    justifyContent: 'center',

  },
    carousel: {
      flex: 1,
      marginTop: 100,
      backgroundColor: '#F5F5DC',
  },
  item: {
    flex: 1,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    fontSize: 30,
    color: 'white',
    flex: 4,
  },
  sections: {
    fontSize: 20
  }
});
