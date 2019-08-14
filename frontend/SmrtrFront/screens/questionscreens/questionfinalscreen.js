import React, { Component } from 'react';
import {
    View,
    Button,
    Text,
} from 'react-native';

import HomeIcon from '../../navigation/HomeIcon';
import { styles } from '../../components/questionpieces/questionstyles';
 


export default class QuestionFinalScreen extends Component {
    constructor(props) {
        super(props)
    }

    static navigationOptions = ({ navigation }) => {
        return {
            title: navigation.getParam('title', 'a rando title'),
            headerStyle: {
                backgroundColor: navigation.getParam('headercolor', 'white'),
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
              fontWeight: 'bold',
              },
          
            headerLeft: <HomeIcon />,
        }
    }

    
    render() {
        const { navigate } = this.props.navigation   
        const right = this.props.navigation.getParam('right', 'fuck it');
        const wrong = this.props.navigation.getParam('wrong', 'also fuck it')        
        return (
            <View style={{flex: 1, justifyContent: 'center', alignContent: 'center'}}>
                <Text style={{...styles.title, textAlign: 'center'}}>Today's Stats...</Text>
                <Text style={styles.scoreRight}>Right: {JSON.stringify(right)}</Text>
                <Text style={styles.scoreWrong}>Wrong: {JSON.stringify(wrong)}</Text>
                <Button
                    title="See My Belts"
                    onPress={() => navigate('Belts')}
                />
            </View>
        )
    }
}


