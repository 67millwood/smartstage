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
    }
  });
  
  export { styles }