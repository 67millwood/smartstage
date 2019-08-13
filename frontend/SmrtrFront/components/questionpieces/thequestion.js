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
          currentquestion: this.props.currentquestion,
        }
    }
        questionType = () => {
        const qtype = this.props.currentquestion.qtype_id
        switch (qtype) {
            case 1:
                return <MultipleChoiceQuestion
                            currentquestion={this.props.currentquestion}
                            pageturnbutton={this.props.pageturnbutton}
                            scorekeeper={this.props.scorekeeper}
                            />
            case 2:
                return <TrueFalseQuestion
                            currentquestion={this.props.currentquestion}
                            pageturnbutton={this.props.pageturnbutton}
                            scorekeeper={this.props.scorekeeper}

                            />
            case 3:
                return <RatingQuestion
                            currentquestion={this.props.currentquestion}
                            pageturnbutton={this.props.pageturnbutton}
                            scorekeeper={this.props.scorekeeper}

                            />
            case 4:
                return <RankingQuestion
                            currentquestion={this.props.currentquestion}
                            pageturnbutton={this.props.pageturnbutton}
                            scorekeeper={this.props.scorekeeper}

                            />
        }
    }

    render() {
        const question = this.props.currentquestion
        return (
            <View>
                    {this.questionType()}
            </View>
        )
    }
}