import {
    createStackNavigator,
    createAppContainer
  } from 'react-navigation';
  
  import QuestionScreen from '../screens/questionscreens/questionscreen';
  import QuestionFinalScreen from '../screens/questionscreens/questionfinalscreen';
  
  
  const QuestionStack = createStackNavigator(
    {
    Question: QuestionScreen,
    QuestionFinal: QuestionFinalScreen,
    },
  );

    
  
  export default createAppContainer(QuestionStack);
  