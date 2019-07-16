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
    
    componentDidMount() {
      const { navigation } = this.props;
      this.focusListener = navigation.addListener("didFocus", () => {
        // The screen is focused
        this.getCategory();
        this.getReadings();
      });
    }
    
    componentWillUnmount() {
        // Remove the event listener
        this.focusListener.remove();
      }
    
    getReadings = async () => {
      const userToken = await AsyncStorage.getItem('LoginToken');
      console.log(userToken)
  
      try {
          return fetch('http://localhost:8080/api/readings', {
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

    renderlist = ({ item }) => (
      <View>
        <TouchableOpacity 
          style={{backgroundColor: 'green' }}>
            <Text>
              Reading {item.reading_text}
            </Text>
        </TouchableOpacity>
      </View>
    );

    pullOut = () => {
      const value = this.state.readings
      value.forEach(function(item) {
          let x = item.reading_text
          console.log(x)
      })
    }
    
    getCategory = async () => {
      const category = await AsyncStorage.getItem('category');
      this.setState({category: category})
    }

    pageTurn = () => {
      const { navigate, push } = this.props.navigation        

      if (this.state.pagecount == 3) {
        navigate('ReviewFinal')
      } else {
        this.setState({ pagecount: this.state.pagecount + 1})
        
        
      }
    }
  
    
    render() {
        const { navigate } = this.props.navigation
        this.pullOut();     

        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <Text>This is a Review page.
                      {"\n"}
                      {this.state.category}
                </Text>
                <Text>
                  
                </Text>
                <FlatList
                data={this.state.readings}
                renderItem={this.renderlist}
                keyExtractor={(item) => String(item.id)}
                />

                <Text>
                  {this.state.pagecount}
                </Text>
                <Button
                title='Done'
                onPress={() => navigate('ReviewFinal')}
                />
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
