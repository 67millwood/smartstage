import { StyleSheet } from 'react-native'



const styles = StyleSheet.create({
    title: {
      fontSize: 25,
      color: 'red',
      textAlign: 'center',
    },
    falseChoice: {
        width: 100,
        backgroundColor: 'aqua',
        marginBottom: 5,

    },
    trueChoice: {
        width: 100,
        backgroundColor: 'cadetblue',
        marginBottom: 5,

    },
    choice1: {
        backgroundColor: 'burlywood',
        marginBottom: 7,
        marginTop: 10,
        fontSize: 17,


    },
    choice2: {
        backgroundColor: 'coral',
        marginBottom: 7,
        fontSize: 17,


    },
    choice3: {
        backgroundColor: 'lavender',
        marginBottom: 7,
        fontSize: 17,


    },
    choice4: {
        backgroundColor: 'khaki',
        fontSize: 17,


    },

    item: {
      height: 450,
      borderWidth: 2,
      justifyContent: 'center',
      alignItems: 'center'
    },
    questionText: {
      fontSize: 20,
      color: 'black',
    },
    sections: {
      fontSize: 20
    },
    slider: {
        alignItems: "stretch",
        justifyContent: "center"

    
    }
  });
  
  export { styles }