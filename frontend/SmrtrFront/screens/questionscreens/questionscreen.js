import React, { Component } from 'react';
import {
    View,
    AsyncStorage,
    Alert,

} from 'react-native';

import HomeIcon from '../../navigation/HomeIcon';
import MainQuestion from '../../components/questionpieces/thequestion';

export default class QuestionScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: [],
      category: '',
      pagecount: 0,
      currentquestion: '',

    }
}
static navigationOptions = ({ navigation }) => {
  return {
    title: navigation.getParam('otherParam', 'A Nested Details Screen'),
    headerStyle: {
      backgroundColor: navigation.getParam('color', 'white'),
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
    fontWeight: 'bold',
    },
    headerLeft: (
    <View>
      <HomeIcon />
    </View>
    ),
    
  }
}



// getCategory sets the state.category
// getQuestions calls the api and gets an object with 4 readings in the correct Category
componentDidMount() {
  const { navigation } = this.props;
  this.focusListener = navigation.addListener("didFocus", () => {
    // The screen is focused
    this.getQuestions();
  });
}

componentWillUnmount() {
    // Remove the event listener
    this.focusListener.remove();
  }

// gets the readings via the api
getQuestions = async () => {
  const { navigate } = this.props.navigation        

  const category = await AsyncStorage.getItem('category');
  this.setState({category: category})

  const category_id = await AsyncStorage.getItem('category_id');
  console.log(category_id)

  const userToken = await AsyncStorage.getItem('LoginToken');
  console.log(userToken)

  try {
      return fetch(('http://localhost:8080/api/shuffleset?category=' + category_id), {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Token ${userToken}`,
        },
    })
    .then(response => {
      if(!response.ok) {
        console.log('crap')      
        } else {
          response.json().then(data => {
            this.setState({
              questions: data
            }
            )
            if (data.length == 0) {
              Alert.alert(this.state.category, '\nThere are no questions left\nat this level.', onPress= () => navigate('Home')
              )
            } else {
              this.singleQuestion()
            }
          })
      }
    })
    }
  catch(error) {
    console.log('no questions coming');
  };
}

// sets the various required states
singleQuestion = () => {
  this.setState({
    currentquestion: this.state.questions[this.state.pagecount],
    pagecount: this.state.pagecount + 1,
  })
  }

// click handler when user clicks 'next' increases state.pagecount
// ends after questions are done by navigating to final page of review
pageTurn = () => {
  const { navigate } = this.props.navigation        
  if (this.state.pagecount == (this.state.questions).length) {
    navigate('QuestionFinal', {title: this.state.category})
  } else {
    this.setState({ 
      pagecount: this.state.pagecount + 1,
    })
    this.singleQuestion()
  }
}


render() {
    const { navigate } = this.props.navigation;


    return (
            <View style={{ flex: 1, paddingTop: 25, justifyContent: "flex-start", alignItems: "center" }}>
            <MainQuestion 
            questiondata={this.state.currentquestion}
            pageturnbutton={this.pageTurn}
            />
        </View>
        )
}

}





