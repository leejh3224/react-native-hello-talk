import * as React from "react";
import { StyleSheet, TextInput } from "react-native";
import { NavigationScreenProps } from "react-navigation";
import { colors } from "theme";
import { BackButton } from "components";
import ChatFindFriend from "./ChatFindFriend";

const ChatFindFriendScreen = {
  screen: ChatFindFriend,
  navigationOptions: ({ navigation }: NavigationScreenProps) => {
    const styles = StyleSheet.create({
      input: {
        backgroundColor: colors.lightGray,
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 10,
        fontSize: 20,
        color: colors.darkGray,
        flex: 1
      }
    });

    return {
      headerStyle: {
        height: 70,
        // shadow
        shadowColor: colors.gray,
        shadowOffset: {
          width: 0,
          height: 3
        },
        shadowOpacity: 0.27,
        shadowRadius: 2.65,
        elevation: 3
      },
      headerLeft: <BackButton path={["chat", "home"]} showTabBar />,
      headerTitle: (
        <TextInput
          placeholder="사용자 이름/언어 (예: kr)"
          style={styles.input}
          onChangeText={text => {
            navigation.setParams({ findFriendKeyword: text });
          }}
        />
      ),
      headerRight: null
    };
  }
};

export default ChatFindFriendScreen;
