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


export default class MultipleChoiceQuestion extends Component {
    constructor(props) {
        super(props);
        this.state = {
            picked: false,
        }
    }

    selectedChoice = () => {
        this.state.picked == true ? this.setState({ picked: false}) : this.setState({ picked: true})
    }


    render() {
        const question = this.props.info
        return (
            <View>
                <Text style={styles.title}>
                    Multiple Choice
                </Text>
                <Text style={styles.questionText}>
                    {question.question_text}
                </Text>
                <TouchableOpacity 
                    style={this.state.picked ? {...styles.choice1, ...{backgroundColor: 'blue'}} : styles.choice1}
                    onPress={() => {
                        this.selectedChoice()
                    }}
                >
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