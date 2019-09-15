import React, { Component } from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    AsyncStorage,
    Slider,
    Button,
} from 'react-native';

//import Slider from '@react-native-community/slider';

import { styles } from './questionstyles';
import AnswerModal from './answermodal';



export default class RatingQuestion extends Component {
    constructor(props) {
        super(props);
        this.state = {
          value: 4,
          modalVisible: false,
          response: '',
          usercorrect: false,

        }
    }
    componentDidUpdate(prevProp) {
      if (this.props.currentquestion.question_text !== prevProp.currentquestion.question_text) {
        this.setState({ 
          value: 4,
          usercorrect: false,
      })
      }
    };


    checkanswer = async () => {
        //const { navigate } = this.props.navigation   
        const userToken = await AsyncStorage.getItem('LoginToken');
     
  
        fetch('http://localhost:8080/api/useranswer', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Token ${userToken}`,
          },
          body: JSON.stringify({
            id: this.props.currentquestion.id,
            qtype_id: this.props.currentquestion.qtype_id,
            ratingAnswer: this.state.value
            
            }),
          })
          .then(response => {
            if(!response.ok) {
              response.json().then(data => {
                console.log('error')
              })        
              } else {
                response.json().then(data => {
                  const user_message = data.feedback[Object.keys(data.feedback)[0]]
                  const rightwrong = Object.keys(data.feedback)[0]
                  if (rightwrong == 'correct_response') {
                    this.setState({ usercorrect: true})
                    this.props.scorekeeper(true)
                  } else {
                    this.props.scorekeeper(false)
                  }
                  console.log(user_message)
                  this.setState({ response: user_message })
                  this.setModalVisible(true)
                })
              }
          })
          .catch(() => {
            console.log('this is bad');
          });
      }

      setModalVisible = (visible) => {
        this.setState({ modalVisible: visible })
      }

            

    render() {
        const question = this.props.currentquestion;
        const score = this.state.value;
        let words;
        
        switch (score) {
          case 1:
            words = 'Completely Disagree';
            break;
          case 2:
            words = 'Strongly Disagree';
            break;

          case 3:
            words = 'Disagree';
            break;

          case 4:
            words = 'Neither Agree nor Disagree';
            break;

          case 5:
            words = 'Agree';
            break;

          case 6:
            words = 'Strongly Agree';
            break;

          case 7:
            words = 'Completely Agree';
        }

        return (
            <View>
                <Text style={styles.title}>
                    Rate this statement...
                </Text>
                <Text style={styles.questionText}>
                    {question.question_text}
                </Text>
                <Text style={{ textAlign: 'center', marginTop: 25, marginBottom: 5 }}>
                  How do you feel about this statement?
                  {"\n"}
                  (Move the slider left and right to choose your answer)
                </Text>
                <Text style={{ fontSize: 20, color: 'blue', textAlign: 'center'}}>
                    {words}
                </Text>
                <Slider
                    value={this.state.value}
                    onValueChange={value => this.setState({ value })}
                    style={styles.slider}
                    minimumValue={1}
                    maximumValue={7}
                    step={1}
                    minimumTrackTintColor="green"
                    maximumTrackTintColor="red"
                />

                <View style={styles.submit}>
                <Button
                    style={{ backgroundColor: 'aqua' }}
                    title='Submit'
                    onPress={this.checkanswer}
                    />
                </View>

                <AnswerModal 
                visiblemodal={this.state.modalVisible}
                useriscorrect={this.state.usercorrect}
                response={this.state.response}
                closemodal={this.setModalVisible}
                pageturnbutton={this.props.pageturnbutton}
                />


            </View>
        )
    }
}