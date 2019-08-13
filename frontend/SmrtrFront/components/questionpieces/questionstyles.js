import { StyleSheet } from 'react-native'



const styles = StyleSheet.create({
    questionContainer: {
      flex: 1,
    },

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
    choicesBox: {
      flex: 4,
      marginLeft: 5,
      marginRight: 5,
    },

    choice1: {
        flex: 2,
        alignSelf: 'stretch',
        backgroundColor: 'burlywood',
        marginBottom: 7,
        marginTop: 10,
        fontSize: 17,


    },
    choice2: {
        flex: 2,
        backgroundColor: 'coral',
        marginBottom: 7,
        fontSize: 17,


    },
    choice3: {
        flex: 2,
        backgroundColor: 'lavender',
        marginBottom: 7,
        fontSize: 17,


    },
    choice4: {
        flex: 2,
        backgroundColor: 'khaki',
        fontSize: 17,


    },
    selected: {
      borderColor: 'blue',
      borderStyle: 'solid',
      borderWidth: 5
    },

    item: {
      height: 450,
      borderWidth: 2,
      justifyContent: 'center',
      alignItems: 'center'
    },

    questionText: {
      fontSize: 17,
      color: 'black',
    },
    sections: {
      fontSize: 20
    },
    slider: {
        alignItems: "stretch",
        justifyContent: "center"

    
    },

    submit: {
      flex: 2,
      alignContent: 'flex-start'

    },

    bigAnswerModal: {
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'flex-end',
      alignItems: 'stretch',
      
    },
    answerShadeModal: {
      flex: 6,
      backgroundColor: '#D3D3D385',

    },

    correctAnswerModal: {
      flex: 2,
      backgroundColor: 'aqua',
    },
    
    correctAnswerText: {
      fontSize: 25,
      
    },
    
    incorrectAnswerModal: {
      flexDirection: 'row',
      flex: 2,
      backgroundColor: 'coral',
    },
    
    incorrectAnswerText: {
      fontSize: 25,
    },


    answerModalContinue: {
      flex: 1,
      backgroundColor: 'brown',
    }
  });
  
  export { styles }