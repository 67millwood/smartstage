import React, { Component } from 'react';
import {
    Text,
    TextInput,
    View,
    TouchableOpacity,
    StyleSheet,
    AsyncStorage,
    Button,
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
      maintext: '',
      questionid: null,

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
    )
    }}

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
  const category = await AsyncStorage.getItem('category');
  this.setState({category: category})

  const category_id = await AsyncStorage.getItem('category_id');
  console.log(category_id)

  const userToken = await AsyncStorage.getItem('LoginToken');
  console.log(userToken)

  try {
      return fetch(('http://localhost:8080/api/questions?category=' + category_id), {
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
            this.singleQuestion()
            //console.log(this.state.questions[0].question_text)
          })
      }
    })
    }
  catch(error) {
    console.log('no questions coming');
  };
}

// takes the object with 4 questions blocks, breaks into a list
// feeds the page one question at a time based on state.pagecount
singleQuestion = () => {
  this.setState({
    maintext: this.state.questions[this.state.pagecount].question_text,
    questionid: this.state.questions[this.state.pagecount].id
  })
  }





// click handler when user clicks 'next' increases state.pagecount
// ends after questions are done by navigating to final page of review
pageTurn = () => {
  const { navigate } = this.props.navigation        

  if (this.state.pagecount == 4) {
    navigate('QuestionFinal')
  } else {
    this.setState({ 
      pagecount: this.state.pagecount + 1,
    })
    this.singleQuestion()
    
    
  }
}


render() {
    const { navigate } = this.props.navigation
      
    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <Text>This is a Review page.
                  {"\n"}
                  {this.state.category}
            </Text>
            <MainQuestion
            questiontext={this.state.maintext}
            />
              
            <Text>
              {this.state.pagecount}
            </Text>
            <Button
            title='Done'
            onPress={() => navigate('QuestionFinal')}
            />
            <Button
            title='Next'
            onPress={() => {
              this.pageTurn()}
            }
            />
        </View>
        )
}

}

