import React, { Component } from 'react';
import {
    Text,
    TextInput,
    View,
    TouchableOpacity,
    Button,
    AsyncStorage,
    Alert,
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
            userresponse: '',
            randomchoicelist: [],

        }
    }

    componentDidMount() {
        this.shuffle();
      };

    selectedChoice = (choice) => {
        this.setState({ 
            choice1picked: false,
            choice2picked: false,
            choice3picked: false,
            choice4picked: false,
        })
        this.setState({ [`${choice}`]: true}) 
        
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
            multipleChoiceAnswer: this.state.userresponse
            
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
                  console.log(user_message)
                  this.howDidIDo(user_message)
                })
              }
          })
          .catch(() => {
            console.log('this is bad');
          });
      }

      howDidIDo = (message) => {
          Alert.alert(message)

      }

      shuffle = () => {
        const questions = this.props.info
        const array = [questions.choice_1, questions.choice_2, questions.choice_3, questions.choice_4]
        for (let i = array.length - 1; i > 0; i--) {
          let j = Math.floor(Math.random() * (i + 1)); // random index from 0 to i
          [array[i], array[j]] = [array[j], array[i]]; // swap elements
        }
        this.setState({ randomchoicelist: array})
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
                        this.setState({ userresponse: this.state.randomchoicelist[0]})
                    }}
                    >
                    <Text>
                    {this.state.randomchoicelist[0]}
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={this.state.choice2picked ? {...styles.choice2, ...styles.selected} : styles.choice2}
                    onPress={() => {
                        this.selectedChoice('choice2picked')
                        this.setState({ userresponse: this.state.randomchoicelist[1]})
                    }}
                    >
                    <Text>
                    {this.state.randomchoicelist[1]}
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={this.state.choice3picked ? {...styles.choice3, ...styles.selected} : styles.choice3}
                    onPress={() => {
                        this.selectedChoice('choice3picked')
                        this.setState({ userresponse: this.state.randomchoicelist[2]})
                    }}
                    >
                    <Text>
                    {this.state.randomchoicelist[2]}
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity 
                    style={this.state.choice4picked ? {...styles.choice4, ...styles.selected} : styles.choice4}
                    onPress={() => {
                        this.selectedChoice('choice4picked')
                        this.setState({ userresponse: this.state.randomchoicelist[3]})
                    }}
                    >
                    <Text>
                    {this.state.randomchoicelist[3]}
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={{backgroundColor: 'aqua' }} 
                    onPress={this.checkanswer}
                      >
                        <Text>Submit</Text>

                </TouchableOpacity>


            </View>
        )
    }
}