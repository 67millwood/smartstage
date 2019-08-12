import React, { Component } from 'react';
import {
    View,
    Button,
    Text,
} from 'react-native';

import HomeIcon from '../../navigation/HomeIcon';



export default class ReviewFinalScreen extends Component {
    constructor(props) {
        super(props)
    }

    static navigationOptions = ({ navigation }) => {
        return {
            title: navigation.getParam('title', 'a rando title'),
            headerLeft: <HomeIcon />,
        }
    }


    render() {
        
        return (
            <View>
                <Text>
                    Good reading.
                </Text>
            </View>
        )
    }
}

