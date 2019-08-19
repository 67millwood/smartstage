import {
    createStackNavigator,
    createAppContainer
  } from 'react-navigation';
  
  import ProfileScreen from '../screens/authscreens/ProfilePage';
  import PwdChangeScreen from '../screens/authscreens/PwdChange';
  import EmailChangeScreen from '../screens/authscreens/EmailChange';
  import DeleteAccountScreen from '../screens/authscreens/DeleteAccount';

  const ProfileStack = createStackNavigator(
    {
    Profile: ProfileScreen,
    PwdChange: PwdChangeScreen,
    EmailChange: EmailChangeScreen,
    DeleteAccount: DeleteAccountScreen,
    }
  );

  export default createAppContainer(ProfileStack);
  