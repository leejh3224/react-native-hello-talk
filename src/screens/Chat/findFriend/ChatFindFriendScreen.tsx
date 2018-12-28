import * as React from "react";
import { StyleSheet, TextInput } from "react-native";
import { NavigationScreenProps, HeaderBackButton } from "react-navigation";
import { connect } from "react-redux";
import { setBottomTabBarVisibility } from "store/modules/ui";
import { getNavigationKey } from "lib";
import { colors } from "theme";
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

    const BackButton = props => {
      return (
        <HeaderBackButton
          onPress={() => {
            navigation.navigate(getNavigationKey(["chat", "home"]));
            props.setBottomTabBarVisibility(true);
          }}
        />
      );
    };

    const ConnectedBackButton = connect(
      null,
      { setBottomTabBarVisibility }
    )(BackButton);

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
      headerLeft: <ConnectedBackButton />,
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

export default ChatFindFriendScreen;
