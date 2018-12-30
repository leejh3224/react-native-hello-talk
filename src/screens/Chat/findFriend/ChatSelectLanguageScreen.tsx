import * as React from "react";
import { View, Text, StyleSheet } from "react-native";
import { NavigationScreenProps } from "react-navigation";
import ChatSelectLanguage from "./ChatSelectLanguage";

const ChatSelectLanguageScreen = {
  screen: ChatSelectLanguage,
  navigationOptions: ({ navigation }: NavigationScreenProps) => {
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
          <Text style={styles.title}>
            {navigation.getParam("pageTitle", "")}
          </Text>
        </View>
      )
    };
  }
};

export default ChatSelectLanguageScreen;
