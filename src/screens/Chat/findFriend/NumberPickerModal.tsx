import * as React from "react";
import {
  View,
  Text,
  Picker,
  StyleSheet,
  Platform,
  TouchableOpacity
} from "react-native";
import range from "lodash.range";
import { BaseModal } from "components";
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
    title: {
      fontSize: 20
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
    <BaseModal visible={visible} onClose={onClose}>
      <Text style={styles.title}>나이 범위</Text>
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
    </BaseModal>
  );
};

export default NumberPickerModal;
