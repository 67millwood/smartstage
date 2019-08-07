import React, { Component } from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    AsyncStorage,
    Alert,
    Modal,
    TouchableHighlight
} from 'react-native';

import { styles } from './questionstyles';

export default class TrueFalseQuestion extends Component {
    constructor(props) {
        super(props);
        this.state = {
            choiceTrue: false,
            choiceFalse: false,
            modalVisible: false,
            response: '',
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
            id: this.props.info.id,
            qtype_id: this.props.info.qtype_id,
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
                <TouchableOpacity
                    style={{backgroundColor: 'aqua' }} 
                    onPress={this.checkanswer}
                      >
                        <Text>Submit</Text>

                </TouchableOpacity>
                <Modal
                  animationType="slide"
                  transparent={true}
                  visible={this.state.modalVisible}
                  >
                  <View style={styles.bigAnswerModal}>
                    <View style={styles.answerShadeModal} />
                    <View style={styles.answerModal}>
                      <TouchableHighlight
                        onPress={() => {
                          this.setModalVisible(!this.state.modalVisible);
                        }}>
                        <Text>{this.state.response}</Text>
                      </TouchableHighlight>
                    </View>
                    <View style={styles.answerModalContinue}>
                      <TouchableHighlight
                        onPress={() => {
                          this.setModalVisible(!this.state.modalVisible);
                        }}>
                        <Text>Continue</Text>
                      </TouchableHighlight>
                    </View>

                  </View>
                </Modal>

            </View>
        )
    }
}

