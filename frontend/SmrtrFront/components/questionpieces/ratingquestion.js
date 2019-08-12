import React, { Component } from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    AsyncStorage,
    Slider
} from 'react-native';

//import Slider from '@react-native-community/slider';

import { styles } from './questionstyles';
import AnswerModal from './answermodal';



export default class RatingQuestion extends Component {
    constructor(props) {
        super(props);
        this.state = {
          value: 0,
          modalVisible: false,
          response: '',
          usercorrect: false,

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
                <TouchableOpacity
                    style={{backgroundColor: 'aqua' }} 
                    onPress={this.checkanswer}
                      >
                    <Text>Submit</Text>

                </TouchableOpacity>
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