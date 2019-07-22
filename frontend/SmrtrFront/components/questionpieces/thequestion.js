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
    render() {
        return (
            <Text>
                {this.props.questiontext}
            </Text>
        )
    }
}