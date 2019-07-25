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
                    style={styles.trueChoice} 
                      >
                    <Text style={styles.sections}>TRUE</Text>

                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.falseChoice} 
                      >
                    <Text style={styles.sections}>FALSE</Text>

                </TouchableOpacity>

            </View>
        )
    }
}

