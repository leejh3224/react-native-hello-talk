import * as React from "react";
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Dimensions
} from "react-native";
import { colors } from "theme";

interface Props {
  onPress: any;
  name: string;
  value?: string;
  containerStyle?: any;
  displayElement?: React.ReactNode;
}

const FormSection: React.SFC<Props> = ({
  onPress,
  name,
  value,
  containerStyle,
  displayElement
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
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Text style={styles.description} numberOfLines={1} ellipsizeMode="tail">
          {value}
        </Text>
        <View style={{ paddingRight: 8 }} />
        {displayElement}
      </View>
    </TouchableOpacity>
  );
};

export default FormSection;
