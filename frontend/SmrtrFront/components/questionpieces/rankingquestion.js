import React, { Component } from 'react';
import {
    Text,
    TextInput,
    View,
    TouchableOpacity,
    Button,
    Fragment,
    ScrollView,
} from 'react-native';

import { styles } from './questionstyles';
import DraggableFlatList from 'react-native-draggable-flatlist';


export default class RankingQuestion extends Component {
    state = {

        data: [this.props.info.choice_1, this.props.info.choice_2, this.props.info.choice_3, this.props.info.choice_4].map((choice, index) => ({
          key: `item-${index}`,
          label: choice,
        }))
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
  
                <View style={{ height: 300 }}>
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

                
            </View>
        )
    }
}

/* old view
                <TouchableOpacity style={styles.choice1}>
                    <Text>
                    {question.choice_1}
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.choice2}>
                    <Text>
                    {question.choice_2}
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.choice3}>
                    <Text>
                    {question.choice_3}
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.choice4}>
                    <Text>
                    {question.choice_4}
                    </Text>
                </TouchableOpacity>
*/