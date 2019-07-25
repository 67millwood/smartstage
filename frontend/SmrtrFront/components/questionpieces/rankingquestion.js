import React, { Component } from 'react';
import {
    Text,
    TextInput,
    View,
    TouchableOpacity,
    Button,
    Fragment
} from 'react-native';

import { styles } from './questionstyles';


export default class RankingQuestion extends Component {


    render() {
        const question = this.props.info
        return (
            <View>
                <Text>
                    RANK THIS BITCHES!!!
                </Text>
                <Text style={styles.questionText}>
                    {question.question_text}
                </Text>
            </View>
        )
    }
}