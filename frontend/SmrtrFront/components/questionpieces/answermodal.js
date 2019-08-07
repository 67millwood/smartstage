import React, { Component } from 'react';
import { Modal, TouchableHighlight, View, Text,   } from 'react-native';

import { styles } from './questionstyles';

export default class AnswerModal extends Component {
  render() {
        return (  <Modal
                animationType="slide"
                transparent={true}
                visible={this.props.visiblemodal}
                >
                <View style={styles.bigAnswerModal}>
                  <View style={styles.answerShadeModal} />
                  <View
                  style={this.props.useriscorrect ? styles.correctAnswerModal : styles.incorrectAnswerModal}>
                  <TouchableHighlight
                      onPress={() => {
                        this.props.closemodal(!this.props.visiblemodal);
                      }}>
                      <Text style={styles.correctAnswerText}>
                      {this.props.response}</Text>
                    </TouchableHighlight>
                  </View>
                  <View style={styles.answerModalContinue}>
                    <TouchableHighlight
                      onPress={() => {
                        this.props.pageturnbutton()
                      }}>
                      <Text style={{ fontSize: 25 }}>Continue</Text>
                    </TouchableHighlight>
                  </View>

                </View>
              </Modal>
        ) 
    }
}


