import React, { Component } from 'react';
import {
    Text,
    TextInput,
    View,
    TouchableOpacity,
    StyleSheet,
    AsyncStorage,
    Button,
} from 'react-native';
import HomeIcon from '../../navigation/HomeIcon';


export default class QuestionScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
          questionpack: [],
          category: ''
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
    
    
    render() {
        const { navigate } = this.props.navigation   

        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <Text>{this.state.category}</Text>
                <Button
                title='Done'
                onPress={() => navigate('QuestionFinal')}
                />
            </View>
            )
    }



}
