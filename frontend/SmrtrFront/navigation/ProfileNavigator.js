import {
    createStackNavigator,
    createAppContainer
  } from 'react-navigation';
  
  import ProfileScreen from '../screens/authscreens/ProfilePage';
  import PwdChangeScreen from '../screens/authscreens/PwdChange';
  
  const ProfileStack = createStackNavigator(
    {
    Profile: ProfileScreen,
    PwdChange: PwdChangeScreen,
    }
  );

  export default createAppContainer(ProfileStack);
  