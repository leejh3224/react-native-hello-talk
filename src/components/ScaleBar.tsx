import * as React from "react";
import { View, Text, StyleSheet } from "react-native";
import { colors } from "theme";

interface Props {
  label: string;
  scale: number;
  barColor: string;
}

const ScaleBar: React.SFC<Props> = ({ label, scale, barColor }) => {
  const styles = StyleSheet.create({
    container: {
      width: 28,
      height: 5,
      backgroundColor: colors.lightGray,
      borderRadius: 5,
      position: "relative"
    },
    bar: {
      width: 7 * scale,
      backgroundColor: barColor,
      height: 5,
      borderRadius: 5,
      position: "absolute"
    },
    label: {
      fontSize: 13,
      marginBottom: 4
    }
  });

  return (
    <View>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.container}>
        <View style={styles.bar} />
      </View>
    </View>
  );
};

export default ScaleBar;
