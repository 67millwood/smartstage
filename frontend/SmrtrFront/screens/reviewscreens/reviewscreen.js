import React, { Component } from 'react';
import {
    Text,
    View,
    Button,
    AsyncStorage,
} from 'react-native';
import HomeIcon from '../../navigation/HomeIcon';


export default class ReviewScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
          reviewpack: [],
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
      });
    }
    
    componentWillUnmount() {
        // Remove the event listener
        this.focusListener.remove();
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

        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <Text>This is a Review page.
                      {"\n"}
                      {this.state.category}
                </Text>
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
