import React, { Component } from 'react';
import {
    Text,
    TextInput,
    View,
    TouchableOpacity,
    Button,
    Fragment
} from 'react-native';

import { styles } from './questionstyles';
import DraggableFlatList from 'react-native-draggable-flatlist';


export default class RankingQuestion extends Component {
    state = {

        data: [this.props.info.choice_1, this.props.info.choice_2, this.props.info.choice_3, this.props.info.choice_4].map((d, index) => ({
          key: `item-${index}`,
          label: d,
        }))
      }



    renderItem = ({ item, index, move, moveEnd, isActive }) => {
        const schemes = ['coral', 'green', 'aqua', 'burlywood']
        return (
          <TouchableOpacity
            
            style={{ 
              height: 100, 
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
              fontSize: 17,
            }}>{item.label}</Text>
            <Text>{index}</Text>
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
                <DraggableFlatList
                    data={this.state.data}
                    renderItem={this.renderItem}
                    keyExtractor={(item, index) => `draggable-item-${item.key}`}
                    
                    onMoveEnd={({ data }) => this.setState({ data })}
                    />

                
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