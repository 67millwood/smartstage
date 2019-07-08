import React from 'react';
import { Button } from 'react-native';
import { withNavigation } from 'react-navigation';
import { Icon } from 'react-native-elements';


class MyBackButton extends React.Component {
  render() {
    return <Icon
            raised
            name='user'
            type='font-awesome'
            color='#f50'
            size={12}
            onPress={() => { this.props.navigation.navigate('Profile') }} />;
  }
}

// withNavigation returns a component that wraps MyBackButton and passes in the
// navigation prop
export default withNavigation(MyBackButton);