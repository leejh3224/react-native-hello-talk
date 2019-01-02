import * as React from "react";
import { TouchableOpacity, Text, StyleSheet, Dimensions } from "react-native";
import { colors } from "theme";

interface Props {
  onPress: any;
  name: string;
  value: any;
  containerStyle?: any;
  formComponent?: any;
}

const FormSection: React.SFC<Props> = ({
  onPress,
  name,
  value,
  containerStyle
}) => {
  const styles = StyleSheet.create({
    container: {
      backgroundColor: colors.white,
      flexDirection: "row",
      padding: 24,
      alignItems: "center",
      justifyContent: "space-between",
      borderBottomColor: colors.gray,
      borderBottomWidth: 0.5
    },
    title: {
      fontSize: 20
    },
    description: {
      fontSize: 16,
      color: colors.gray,
      maxWidth: Dimensions.get("window").width / 2 - 32
    }
  });

  return (
    <TouchableOpacity
      style={containerStyle || styles.container}
      onPress={onPress}
    >
      <Text style={styles.title}>{name}</Text>
      <Text style={styles.description} numberOfLines={1} ellipsizeMode="tail">
        {value}
      </Text>
    </TouchableOpacity>
  );
};

export default FormSection;
