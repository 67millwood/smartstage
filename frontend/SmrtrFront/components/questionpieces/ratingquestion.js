import React, { Component } from 'react';
import {
    Text,
    TextInput,
    View,
    TouchableOpacity,
    Button,
    Fragment,
    Slider
} from 'react-native';

//import Slider from '@react-native-community/slider';

import { styles } from './questionstyles';


export default class RatingQuestion extends Component {
    constructor(props) {
        super(props);
        this.state = {
          value: 0,
        }
    }
            

    render() {
        const question = this.props.info
        return (
            <View>
                <Text style={styles.title}>
                    Rate this statement...
                </Text>
                <Text style={styles.questionText}>
                    {question.question_text}
                </Text>
                <Text style={{ fontSize: 20, color: 'blue'}}>
                    Rating: {this.state.value} out of 7
                </Text>
                <Slider
                    value={this.state.value}
                    onValueChange={value => this.setState({ value })}
                    style={styles.slider}
                    minimumValue={0}
                    maximumValue={7}
                    step={1}
                    minimumTrackTintColor="green"
                    maximumTrackTintColor="red"
                />
            </View>
        )
    }
}