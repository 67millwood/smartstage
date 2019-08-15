import { StyleSheet } from 'react-native'



const styles = StyleSheet.create({
    beltContainer: {
      
        flex: 1,
        paddingTop: 15,
        marginLeft: 5,
        marginRight: 5,
        backgroundColor: '#fff',
    
    },

    title: {
      fontSize: 25,
      color: 'red',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center'

    },
    //the text for the actual question being asked
    mainlineText: {
      fontSize: 17,
      color: 'black',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center'

    },

    percentCompleteText: {
      fontSize: 17,
      color: 'black',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center'

    },

    belt: {
      fontSize: 17,
      color: 'black',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center'

    },


    
    //style impacting the 4 mutliple choice options for a user

    choicesBox: {
      marginLeft: 5,
      marginRight: 5,

    },
    // for 4 multiple choice options
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

    //additional style to a multiple choice option if selected by a user
    },
    selected: {
      borderColor: 'blue',
      borderStyle: 'solid',
      borderWidth: 5
    },
    //rating question
    slider: {
        alignItems: "stretch",
        justifyContent: "center"

    },
    //submit button for answers
    submit: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center'

    },
    //the modal when a question is answered
    bigAnswerModal: {
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'flex-end',
      alignItems: 'stretch',
      
    },
    //shading on whole screen when answer modal is displayed
    answerShadeModal: {
      flex: 6,
      backgroundColor: '#D3D3D385',

    },
    //shading for correct answers in modal
    correctAnswerModal: {
      flex: 2,
      backgroundColor: 'aqua',
    },
    //correct answer font
    correctAnswerText: {
      fontSize: 25,
      
    },
    //shading for incorrect answers in modal
    incorrectAnswerModal: {
      flexDirection: 'row',
      flex: 2,
      backgroundColor: 'coral',
    },
    //incorrect answer font
    incorrectAnswerText: {
      fontSize: 25,
    },
    //color for the continue box in answer modal
    answerModalContinue: {
      flex: 1,
      backgroundColor: 'brown',
    },

    scoreRight: {
      fontSize: 25,
      color: 'blue',
      textAlign: 'center'

    },

    scoreWrong: {
      fontSize: 25,
      color: 'red',
      textAlign: 'center'

    }
  });
  
  export { styles }