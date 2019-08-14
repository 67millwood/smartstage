import React, { Component } from 'react';
import {
    View,
    Button,
    Text,
} from 'react-native';

import HomeIcon from '../../navigation/HomeIcon';
import { styles } from './reviewstyles';


export default class ReviewFinalScreen extends Component {
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
        
        return (
            
            <View style={styles.readingBox}>
                <Text style={styles.readingText}>
                    Good reading.
                </Text>
                <Button
                    title="Home"
                    onPress={() => navigate('Home')}
                />

            </View>
        )
    }
}

