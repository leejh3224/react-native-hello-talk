import * as React from "react";
import {
  View,
  Text,
  Picker,
  StyleSheet,
  Platform,
  TouchableOpacity
} from "react-native";
import Modal from "react-native-modal";
import range from "lodash.range";
import { colors } from "theme";

interface Props {
  visible: boolean;
  ageMin: number;
  ageMax: number;
  onClose: () => void;
  onPickerValueChange: (name: string, value: number) => void;
}

const NumberPickerModal: React.SFC<Props> = ({
  visible,
  ageMin,
  ageMax,
  onClose,
  onPickerValueChange
}) => {
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
    },
    contentContainer: {
      flexDirection: "row",
      justifyContent: "center",
      alignItems: Platform.OS === "android" ? "center" : "flex-start",
      height: Platform.OS === "android" ? 100 : 200
    },
    actionButton: {
      alignSelf: "flex-end"
    },
    picker: { width: "50%", height: 75 },
    actionText: {
      fontSize: 18,
      fontWeight: "bold",
      color: colors.primary
    }
  });

  const pickers = [
    {
      rangeMin: 18,
      rangeMax: ageMax,
      name: "ageMin",
      value: ageMin
    },
    {
      rangeMin: ageMin + 1,
      rangeMax: 91,
      name: "ageMax",
      value: ageMax
    }
  ];

  return (
    <Modal
      isVisible={visible}
      animationIn="fadeIn"
      animationOut="fadeOut"
      animationInTiming={150}
      animationOutTiming={150}
      backdropTransitionInTiming={150}
      backdropTransitionOutTiming={150}
    >
      <View style={styles.container}>
        <Text style={{ fontSize: 20 }}>나이 범위</Text>
        <View style={styles.contentContainer}>
          {pickers.map(({ value, rangeMin, rangeMax, name }) => {
            return (
              <Picker
                key={`picker-${value}`}
                selectedValue={value}
                style={styles.picker}
                onValueChange={pickerValue =>
                  onPickerValueChange(name, pickerValue)
                }
              >
                {range(rangeMin, rangeMax).map(age => (
                  <Picker.Item key={age} label={age.toString()} value={age} />
                ))}
              </Picker>
            );
          })}
        </View>
        <TouchableOpacity onPress={onClose} style={styles.actionButton}>
          <Text style={styles.actionText}>OK</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

export default NumberPickerModal;
