import {
    createStackNavigator,
    createAppContainer
  } from 'react-navigation';
  
  import ReviewScreen from '../screens/reviewscreens/reviewscreen';
  import ReviewFinalScreen from '../screens/questionscreens/questionfinalscreen';
  
  
  const ReviewStack = createStackNavigator(
    {
    Review: ReviewScreen,
    ReviewFinal: ReviewFinalScreen,
    },
  );
    
  
  export default createAppContainer(ReviewStack);
  