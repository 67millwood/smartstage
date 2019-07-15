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

    static navigationOptions = () => {
        return {
        title: 'Questions',
        headerStyle: {
          backgroundColor: 'aqua',
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
    
    getallbelts = async () => {
      const category = await AsyncStorage.getItem('category');
      console.log(category)
    }
    
    
    render() {
        const { navigate } = this.props.navigation   
        this.getallbelts();

        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <Text>Some questions</Text>
                <Button
                title='Done'
                onPress={() => navigate('QuestionFinal')}
                />
            </View>
            )
    }



}
