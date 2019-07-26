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
                <Text style={styles.title}>
                    Rank these 4 choices...
                </Text>
                <Text style={styles.questionText}>
                    {question.question_text}
                </Text>
                <TouchableOpacity style={styles.choice1}>
                    <Text>
                    {question.choice_1}
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.choice2}>
                    <Text>
                    {question.choice_2}
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.choice3}>
                    <Text>
                    {question.choice_3}
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.choice4}>
                    <Text>
                    {question.choice_4}
                    </Text>
                </TouchableOpacity>

            </View>
        )
    }
}