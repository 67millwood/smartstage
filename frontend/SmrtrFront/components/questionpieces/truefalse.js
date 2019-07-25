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



export default class TrueFalseQuestion extends Component {


    render() {
        const question = this.props.info
        return (
            <View>
                <Text>
                    T and F BITCHES!!!
                </Text>
                <Text>
                    {question.question_text}
                </Text>
            </View>
        )
    }
}