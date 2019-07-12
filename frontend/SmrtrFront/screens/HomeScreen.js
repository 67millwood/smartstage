import * as WebBrowser from 'expo-web-browser';
import React, { Component } from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
  AsyncStorage,
  Button,
  Dimensions,
  TouchableOpacity,
} from 'react-native';

import Carousel from 'react-native-anchor-carousel';


const data = [
  {title: 'Critcal Thinking', backgroundColor: 'red'},
  {title: 'Human Behaviour', backgroundColor: 'blue'},
  {title: 'Technology', backgroundColor: 'green'},
  {title: 'Finance', backgroundColor: 'aqua'},
];

const {width} = Dimensions.get('window');


export default class HomeScreen extends Component {
  //event listener runs any function when page 'didFocus' or reloads
  componentDidMount() {
    const { navigation } = this.props;
    this.focusListener = navigation.addListener("didFocus", () => {
      // The screen is focused
      printMyToken();
    });
  }

  componentWillUnmount() {
    // Remove the event listener
    this.focusListener.remove();
  }

  //Method for carosel
  renderItem = ({item, index}) => {
    const {title, backgroundColor} = item;
    return (
        <TouchableOpacity 
          style={[styles.item, {backgroundColor}]}
          onPress={() => {this._carousel.scrollToIndex(index);}}>
              <Text style={styles.text}>{title}</Text>
        </TouchableOpacity>)
  };
  
  render() {
      return (
          <ScrollView
            style={styles.container}
            contentContainerStyle={styles.contentContainer}>

            <View style={styles.contentContainer}>
              <Text style={styles.getStartedText}>
                Smrtr.life
              </Text>
            </View>
            <View>
              <Button title="Do nothing" />
            </View>
            <View style={{backgroundColor: '#fff'}}>
                <Carousel  style={styles.carousel}
                    data={data}
                    renderItem={this.renderItem}
                    itemWidth={200}
                    containerWidth={width - 20} 
                    separatorWidth={20}
                    pagingEnable={true}
                    ref={(c) => {
                        this._carousel = c;
                    }}
                />
            </View>

          </ScrollView>

      );
    }
}

printMyToken = async () => {
  try {
    const value = await AsyncStorage.getItem('LoginToken');
    if (value !== null) {
      console.log(value);
    } else {
      console.log('not an error but we not got it')
    }
  } catch (error) {
    console.log(Math.random());
  }
}

HomeScreen.navigationOptions = {
  header: null,
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
  contentContainer: {
    paddingTop: 30,
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
    carousel: {
      height: 500,
      flex:1
  },
  item: {
    height: 275,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center'
  },

  text: {
    fontSize: 30,
    color: 'white'
  },
});
