import React, { Component } from 'react';
import {
    Text,
    View,
    Button,
} from 'react-native';
import HomeIcon from '../../navigation/HomeIcon';


export default class ReviewScreen extends Component {
    constructor(props) {
        super(props)
    }

    static navigationOptions = () => {
        return {
        title: 'Review',
        headerStyle: {
          backgroundColor: 'burlywood',
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
    
    render() {
        const { navigate } = this.props.navigation        

        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <Text>First Review section.</Text>
                <Button
                title='Done'
                onPress={() => navigate('ReviewFinal')}
                />
            </View>
            )
    }



}
