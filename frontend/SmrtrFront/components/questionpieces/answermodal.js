import React from 'react';
import { Modal, TouchableHighlight, View, Text,   } from 'react-native-elements';

import { styles } from './questionstyles';

export default class AnswerModal extends React.Component {
  render() {
                <Modal
                animationType="slide"
                transparent={true}
                visible={this.state.modalVisible}
                >
                <View style={styles.bigAnswerModal}>
                  <View style={styles.answerShadeModal} />
                  <View
                  style={this.state.usercorrect ? styles.correctAnswerModal : styles.incorrectAnswerModal}>
                  <TouchableHighlight
                      onPress={() => {
                        this.setModalVisible(!this.state.modalVisible);
                      }}>
                      <Text style={styles.correctAnswerText}>
                      {this.state.response}</Text>
                    </TouchableHighlight>
                  </View>
                  <View style={styles.answerModalContinue}>
                    <TouchableHighlight
                      onPress={() => {
                        this.setModalVisible(!this.state.modalVisible);
                      }}>
                      <Text style={{ fontSize: 25 }}>Continue</Text>
                    </TouchableHighlight>
                  </View>

                </View>
              </Modal>
  }
}
