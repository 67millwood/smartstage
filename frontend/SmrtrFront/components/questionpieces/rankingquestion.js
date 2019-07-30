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
import DraggableFlatList from 'react-native-draggable-flatlist';


export default class RankingQuestion extends Component {
    state = {

        data: [this.props.info.choice_1, this.props.info.choice_2, this.props.info.choice_3, this.props.info.choice_4].map((choice, index) => ({
          key: `${index}`,
          label: choice,
        })),
        useranswer: this.props.info.choice_1 + this.props.info.choice_2 + this.props.info.choice_3 + this.props.info.choice_4
      }

    useranswer = () => {
        console.log(this.state.useranswer)
        console.log('-----')
        //console.log(this.state.useranswer)
        answer_list = ''
        this.state.data.forEach(function(item) {
          const x = item.label
          answer_list += x
        })
        console.log(answer_list)
        console.log('-----')

        this.setState({ useranswer: answer_list})
        console.log(this.state.useranswer)
        console.log('-----')
        finalrank = this.state.useranswer
        return finalrank

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
            rankingAnswer: this.userAnswer()
            
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
  

    




    renderItem = ({ item, index, move, moveEnd, isActive }) => {
        const schemes = ['coral', 'green', 'aqua', 'burlywood']
        return (
          <TouchableOpacity
            
            style={{ 
              backgroundColor: isActive ? 'blue' : `${schemes[index]}`,
              marginLeft: 5,
              marginRight: 5,
              marginBottom: 5,
              alignItems: 'center', 
              justifyContent: 'center' 
            }}
            onLongPress={move}
            onPressOut={moveEnd}
          >
            <Text style={{ 
              fontSize: 15,
            }}>{item.label}</Text>
          </TouchableOpacity>
          
        )
        
      }



    render() {
        const question = this.props.info
        return (
            <View>
                <Text style={styles.title}>
                    Rank these 4 choices...
                </Text>
                
                <Text style={styles.questionText}>
                    {question.question_text}
                </Text>
  
                <View style={{ height: 350 }}>
                  {/* setting the hard 300 height not great but works 
                  otherwise the DraggableFlatList eats all things below*/}
                <DraggableFlatList
                    contentContainerStyle={{ flex: 1 }}
                    data={this.state.data}
                    renderItem={this.renderItem}
                    keyExtractor={(item, index) => `draggable-item-${item.key}`}
                    scrollPercent={5}
                    onMoveEnd={({ data }) => this.setState({ data })}
                    />
                </View>
                <TouchableOpacity
                    style={{backgroundColor: 'aqua' }} 
                    onPress={this.useranswer}
                      >
                        <Text>Submit</Text>

                </TouchableOpacity>
                
            </View>
        )
    }
}
