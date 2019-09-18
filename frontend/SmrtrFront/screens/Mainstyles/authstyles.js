import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    title: {
      fontSize: 40,
    },
    input: {
      padding: 5,
      borderBottomColor: 15,
      borderBottomWidth: 1,
      fontSize: 25,
    },
    inputButton: {
      backgroundColor: 'aqua'
    },
    userActivity: {
        flex: 3, 
        justifyContent: 'flex-start',
        marginLeft: 5,
        marginRight: 5,

    },
    container: {
      backgroundColor: '#F5F5DC',
      flex: 1,
      marginTop: 50,
      marginLeft: 15,
      marginRight: 15,
      marginBottom: 30,
    },
    register: {
      fontSize: 20,
    }
  });

export { styles }