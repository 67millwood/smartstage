import React, { Component } from 'react';
import {
    Text,
    TextInput,
    View,
    TouchableOpacity,
    StyleSheet,
    AsyncStorage,
    Button,
    Fragment
} from 'react-native';



export default class RankingQuestion extends Component {


    render() {
        const question = this.props.info
        return (
            <View>
                <Text>
                    RANK THIS BITCHES!!!
                </Text>
                <Text>
                    {question.question_text}
                </Text>
            </View>
        )
    }
}