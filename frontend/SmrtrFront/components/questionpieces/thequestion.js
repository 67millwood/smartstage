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
import MultipleChoiceQuestion from './multiplechoice';
import TrueFalseQuestion from './truefalse';
import RatingQuestion from './ratingquestion';
import RankingQuestion from './rankingquestion';



export default class MainQuestion extends Component {
    constructor(props) {
        super(props);
        this.state = {
          currentquestion: this.props.questiondata,
        }
    }
        questionType = () => {
        const qtype = this.props.questiondata.qtype_id
        switch (qtype) {
            case 1:
                return <MultipleChoiceQuestion
                            info={this.props.questiondata}
                            />
            case 2:
                return <TrueFalseQuestion
                            info={this.props.questiondata}
                            pageturnbutton={this.props.pageturnbutton}
                            />
            case 3:
                return <RatingQuestion
                            info={this.props.questiondata}
                            />
            case 4:
                return <RankingQuestion
                            info={this.props.questiondata}
                            />
        }
    }

    render() {
        const question = this.props.questiondata
        return (
            <View>
                    {this.questionType()}
            </View>
        )
    }
}