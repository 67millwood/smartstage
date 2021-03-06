import React, { Component } from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    AsyncStorage,
    Alert,
    Button,
} from 'react-native';

import { styles } from './questionstyles';
import AnswerModal from './answermodal';

export default class TrueFalseQuestion extends Component {
    constructor(props) {
        super(props);
        this.state = {
            choiceTrue: false,
            choiceFalse: false,
            modalVisible: false,
            response: '',
            usercorrect: false,
        }
        this.checkanswer=this.checkanswer.bind(this)
    }

    selectedChoice = (choice) => {
        this.setState({ 
            choiceTrue: false,
            choiceFalse: false,
        })
        this.setState({ [`${choice}`]: true}) 
        
    }

    componentDidUpdate(prevProp) {
      if (this.props.currentquestion.question_text !== prevProp.currentquestion.question_text) {
        this.setState({ 
          choiceTrue: false,
          choiceFalse: false,
          usercorrect: false,
      })
    }
    };


    checkForSelection = () => {
      if (this.state.choiceTrue == true || this.state.choiceFalse == true) {
        this.checkanswer();
      } else {
        Alert.alert('You must make a selection.')
      }
    }

    userAnswer = () => {
        if (this.state.choiceTrue == true) {
            return true
        } else {
            return false
        }
    }

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
            trueFalseAnswer: this.userAnswer()
            
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
        const question = this.props.currentquestion
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
                    <Text style={styles.tf}>TRUE</Text>

                </TouchableOpacity>

                <TouchableOpacity
                    style={this.state.choiceFalse ? {...styles.falseChoice, ...styles.selected} : styles.falseChoice}
                    onPress={() => {
                        this.selectedChoice('choiceFalse')
                    }}
                      >
                    <Text style={styles.tf}>FALSE</Text>

                </TouchableOpacity>
                <View style={styles.submit}>
                <Button
                    style={{ backgroundColor: 'aqua' }}
                    title='Submit'
                    onPress={() => {
                      this.checkForSelection()
                    }}
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

