import React, { Component } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  AsyncStorage,
  Dimensions,
  TouchableOpacity,
} from 'react-native';

//import Carousel from 'react-native-anchor-carousel';
import Carousel from 'react-native-snap-carousel';

const data = [
  {title: 'Critical Thinking', backgroundColor: 'red', category_id: 1},
  {title: 'Human Behaviour', backgroundColor: 'blue', category_id: 2},
  {title: 'Technology', backgroundColor: 'green', category_id: 3},
  {title: 'Finance', backgroundColor: 'cornflowerblue', category_id: 4},
];

const {width} = Dimensions.get('window');


export default class HomeScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
        category: '',
        category_id: null,
        }
  }



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
    const {title, backgroundColor, category_id} = item;
    const { navigate } = this.props.navigation        


    return (
        <TouchableOpacity 
          style={[styles.item, {backgroundColor}]} >
              <Text style={styles.text}>{title}</Text>
              <TouchableOpacity
                    style={{flex: 1, width: 180, backgroundColor: 'cadetblue' }} 
                    onPress={() => {
                      this.setState({ category: {title}})
                      this.setState({ category_id: {category_id}})
                      this.props.navigation.navigate('Question', {
                        color: backgroundColor,
                        otherParam: title,
                      });
                    }
                    }
                      >
                        <Text style={styles.sections}>Questions</Text>

                </TouchableOpacity>

              <TouchableOpacity
                    style={{flex: 1, width: 180, backgroundColor: 'aqua', marginBottom: 5 }} 
                    onPress={() => {
                      this.setState({ category: {title}})
                      this.setState({ category_id: {category_id}})
                      this.props.navigation.navigate('Review', {
                        color: backgroundColor,
                        otherParam: title,
                      });
                    }
                    }
                      >
                        <Text style={styles.sections}>Review</Text>

                </TouchableOpacity>
        </TouchableOpacity>)
  };

  componentDidUpdate = () => {
    this.setcategory();
  }

  setcategory = async () => {
    const { navigate } = this.props.navigation        
    try {
      await AsyncStorage.setItem('category', (`${this.state.category.title}`))
      await AsyncStorage.setItem('category_id', (`${this.state.category_id.category_id}`))

    } catch (e){
      //errors go here

    }
    //navigate('Question')
  }

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
            <View style={{backgroundColor: '#fff', marginTop: 50}}>
                <Carousel  style={styles.carousel}
                    data={data}
                    renderItem={this.renderItem}
                    itemWidth={200}
                    enableSnap={true}
                    sliderWidth={width - 20} 
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
    paddingTop: 50,
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
    carousel: {
      marginTop: 100,
      height: 500,
      flex:1
  },
  
  item: {
    height: 450,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center'
  },
  

  text: {
    fontSize: 30,
    color: 'white',
    flex: 4,
  },
  sections: {
    fontSize: 20
  }
});
