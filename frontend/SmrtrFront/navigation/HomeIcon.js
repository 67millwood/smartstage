import React from 'react';
import { withNavigation } from 'react-navigation';
import { Icon } from 'react-native-elements';


class HomeIcon extends React.Component {
  render() {
    return <Icon
            raised
            name='home'
            type='font-awesome'
            color='#f5f'
            size={17}
            onPress={() => { this.props.navigation.navigate('Home') }} />;
  }
}

// withNavigation returns a component that wraps HomeIcon and passes in the
// navigation prop
export default withNavigation(HomeIcon);