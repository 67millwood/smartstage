import React, { Component } from 'react';
import {
    Text,
    TextInput,
    View,
    TouchableOpacity,
    Button,
    Fragment,
    FlatList
} from 'react-native';

import { styles } from './questionstyles';


export default class MultipleChoiceQuestion extends Component {
    constructor(props) {
        super(props);
        this.state = {
            choice1picked: false,
            choice2picked: false,
            choice3picked: false,
            choice4picked: false,

        }
    }

    selectedChoice = (choice) => {
        this.setState({ 
            choice1picked: false,
            choice2picked: false,
            choice3picked: false,
            choice4picked: false,
        })
        this.setState({ [`${choice}`]: true}) 
        
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
                    style={this.state.choice1picked ? {...styles.choice1, ...styles.selected} : styles.choice1}
                    onPress={() => {
                        this.selectedChoice('choice1picked')
                    }}
                >
                    <Text>
                    {question.choice_1}
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={this.state.choice2picked ? {...styles.choice2, ...styles.selected} : styles.choice2}
                    onPress={() => {
                        this.selectedChoice('choice2picked')
                    }}
                    >
                    <Text>
                    {question.choice_2}
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={this.state.choice3picked ? {...styles.choice3, ...styles.selected} : styles.choice3}
                    onPress={() => {
                        this.selectedChoice('choice3picked')
                    }}
                    >
                    <Text>
                    {question.choice_3}
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={this.state.choice4picked ? {...styles.choice4, ...styles.selected} : styles.choice4}
                    onPress={() => {
                        this.selectedChoice('choice4picked')
                    }}
                    >
                    <Text>
                    {question.choice_4}
                    </Text>
                </TouchableOpacity>

            </View>
        )
    }
}