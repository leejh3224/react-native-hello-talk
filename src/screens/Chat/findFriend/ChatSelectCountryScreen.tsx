import * as React from "react";
import { View, Text, StyleSheet } from "react-native";
import ChatSelectCountry from "./ChatSelectCountry";

const ChatSelectCountryScreen = {
  screen: ChatSelectCountry,
  navigationOptions: () => {
    const styles = StyleSheet.create({
      titleContainer: {
        flex: 1,
        alignItems: "flex-start"
      },
      title: {
        fontSize: 24,
        fontWeight: "bold"
      }
    });

    return {
      headerTitle: (
        <View style={styles.titleContainer}>
          <Text style={styles.title}>지역</Text>
        </View>
      )
    };
  }
};

export default ChatSelectCountryScreen;
