import * as React from "react";
import { View, Text, StyleSheet, TextInput, Dimensions } from "react-native";
import { NavigationScreenProps, HeaderBackButton } from "react-navigation";
import { getNavigationKey } from "lib";
import { colors } from "theme";

class ChatFindFriend extends React.Component {
  render() {
    return (
      <View>
        <Text>find friend</Text>
      </View>
    );
  }
}

export const ChatFindFriendScreen = {
  screen: ChatFindFriend,
  navigationOptions: ({ navigation }: NavigationScreenProps) => {
    const screen = Dimensions.get("window");
    const styles = StyleSheet.create({
      input: {
        // back button size * 2
        width: screen.width - 90,
        backgroundColor: colors.lightGray,
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 10,
        fontSize: 20,
        color: colors.darkGray
      }
    });

    return {
      headerLeft: (
        <HeaderBackButton
          onPress={() =>
            navigation.navigate(getNavigationKey(["chat", "home"]))
          }
        />
      ),
      headerTitle: (
        <TextInput
          placeholder="사용자 이름/언어 (예: kr)"
          style={styles.input}
        />
      ),
      headerRight: null
    };
  }
};

export default ChatFindFriend;
