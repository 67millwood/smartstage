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



export default class MainQuestion extends Component {

    questionType = () => {
        const qtype = this.props.questiontype
        switch (qtype) {
            case 1:
                return 'Multiple Choice'
            case 2:
                return 'True/False'
            case 3:
                return 'Rating'
            case 4:
                return 'Ranking'
        }
    }


    render() {
        return (
            <View>
                <Text>
                    {this.questionType()}
                </Text>
                <Text>
                    {this.props.questiontext}
                </Text>
            </View>
        )
    }
}