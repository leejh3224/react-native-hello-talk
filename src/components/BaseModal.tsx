import * as React from "react";
import { View, StyleSheet } from "react-native";
import Modal from "react-native-modal";
import { colors } from "theme";

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    marginHorizontal: 16,
    padding: 24,
    borderRadius: 5,
    // shadow
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6
  }
});

interface Props {
  visible: boolean;
  onClose: () => void;
}

const BaseModal: React.SFC<Props> = ({ visible, children, onClose }) => {
  return (
    <Modal
      isVisible={visible}
      animationIn="fadeIn"
      animationOut="fadeOut"
      animationInTiming={200}
      animationOutTiming={200}
      backdropTransitionInTiming={200}
      backdropTransitionOutTiming={200}
      /* Tap outside to close: https://github.com/react-native-community/react-native-modal/issues/11 */
      onBackdropPress={onClose}
    >
      <View style={styles.container}>{children}</View>
    </Modal>
  );
};

export default BaseModal;
