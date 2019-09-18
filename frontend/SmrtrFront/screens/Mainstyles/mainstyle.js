import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({

    // style for general user among Screens
    mainlineText: {
      fontSize: 17,

    },

    subTitle: {
      paddingTop: 20,
      fontSize: 22,
      fontWeight: 'bold',
      color: 'green',
    },

    highlightedData: {
      fontWeight: 'bold',
      color: 'navy',

    },

    selected: {
      borderColor: 'blue',
      borderStyle: 'solid',
      borderWidth: 5
    },

    submit: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center'

    },

    //style BeltScreen

    beltContainer: {
      
        flex: 1,
        paddingTop: 15,
        marginLeft: 5,
        marginRight: 5,
        backgroundColor: '#fff',
    
    },

    percentCompleteText: {
      fontSize: 17,

    },

    smallerBeltText: {
      fontSize: 12,
    },

    belt: {
      borderColor: 'beige',
      borderStyle: 'solid',
      borderWidth: 5,
      borderBottomLeftRadius: 5,
      borderBottomRightRadius: 5,
      borderTopRightRadius: 5,
      borderTopLeftRadius: 5,
      marginBottom: 5,

    },
    
    //style AnalyticsScreen

    //if a full screen Modal with choices is needed
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

    //large text for positive and negative results
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