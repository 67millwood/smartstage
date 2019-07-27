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

export default class TrueFalseQuestion extends Component {
    constructor(props) {
        super(props);
        this.state = {
            choiceTrue: false,
            choiceFalse: false,
        }
    }

    selectedChoice = (choice) => {
        this.setState({ 
            choiceTrue: false,
            choiceFalse: false,
        })
        this.setState({ [`${choice}`]: true}) 
        
    }

    render() {
        const question = this.props.info
        return (
            <View >
                <Text style={styles.title}>
                    True or False?
                </Text>
                <Text style={styles.questionText}>
                    {question.question_text}
                </Text>
                <TouchableOpacity
                    style={this.state.choiceTrue ? {...styles.trueChoice, ...styles.selected} : styles.trueChoice}
                    onPress={() => {
                        this.selectedChoice('choiceTrue')
                    }}
                      >
                    <Text style={styles.sections}>TRUE</Text>

                </TouchableOpacity>

                <TouchableOpacity
                    style={this.state.choiceFalse ? {...styles.falseChoice, ...styles.selected} : styles.falseChoice}
                    onPress={() => {
                        this.selectedChoice('choiceFalse')
                    }}
                      >
                    <Text style={styles.sections}>FALSE</Text>

                </TouchableOpacity>

            </View>
        )
    }
}

