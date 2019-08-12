import React, { Component } from 'react';
import {
    View,
    Button,
} from 'react-native';

import HomeIcon from '../../navigation/HomeIcon';



export default class QuestionFinalScreen extends Component {
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
        const { navigate } = this.props.navigation        
        return (
            <View>
                <Button
                title='Home'
                onPress={() => navigate('Home')}
                />
            </View>
        )
    }
}


