import React, { Component } from 'react';
import {
    View,
    Button,
} from 'react-native';



export default class ReviewFinalScreen extends Component {
    constructor(props) {
        super(props)
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

