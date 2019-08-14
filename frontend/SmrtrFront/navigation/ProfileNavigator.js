import {
    createStackNavigator,
    createAppContainer
  } from 'react-navigation';
  
  import ProfileScreen from '../screens/authscreens/ProfilePage';
  
  
  const ProfileStack = createStackNavigator(
    {
    Profile: ProfileScreen,
    }
  );

  export default createAppContainer(ProfileStack);
  