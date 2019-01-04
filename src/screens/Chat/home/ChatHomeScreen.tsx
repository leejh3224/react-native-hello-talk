import * as React from "react";
import { StyleSheet, Text } from "react-native";
import { NavigationScreenProps } from "react-navigation";
import {
  Menu,
  MenuTrigger,
  MenuOptions,
  MenuOption
} from "react-native-popup-menu";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { connect } from "react-redux";
import { setBottomTabBarVisibility } from "store/modules/ui";
import { getNavigationKey } from "lib";
import ChatHome from "./ChatHome";

const ChatHomeScreen = {
  screen: ChatHome,
  navigationOptions: ({ navigation }: NavigationScreenProps) => {
    const styles = StyleSheet.create({
      boxListItem: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        padding: 16
      },
      menuText: {
        fontSize: 20,
        padding: 16
      },
      navBarTitle: {
        fontSize: 32,
        fontWeight: "bold",
        marginLeft: 16
      }
    });

    const HeaderRightMenu = props => {
      return (
        <Menu>
          <MenuTrigger>
            <MaterialCommunityIcons
              name="plus"
              size={32}
              style={{ marginRight: 16 }}
            />
          </MenuTrigger>
          <MenuOptions>
            <MenuOption
              style={styles.boxListItem}
              value={1}
              onSelect={() => {
                navigation.navigate(getNavigationKey(["chat", "findFriend"]));
                props.setBottomTabBarVisibility(false);
              }}
            >
              <MaterialCommunityIcons name="account-plus" size={24} />
              <Text style={styles.menuText}>파트너 찾기</Text>
            </MenuOption>
            <MenuOption
              style={styles.boxListItem}
              value={2}
              onSelect={() => {
                navigation.navigate(getNavigationKey(["chat", "create"]));
                props.setBottomTabBarVisibility(false);
              }}
            >
              <MaterialCommunityIcons
                name="comment-multiple-outline"
                size={24}
              />
              <Text style={styles.menuText}>채팅 시작</Text>
            </MenuOption>
          </MenuOptions>
        </Menu>
      );
    };

    const ConnectedHeaderRightMenu = connect(
      null,
      { setBottomTabBarVisibility }
    )(HeaderRightMenu);

    return {
      headerLeft: <Text style={styles.navBarTitle}>Chat</Text>,
      headerRight: <ConnectedHeaderRightMenu />
    };
  }
};

export default ChatHomeScreen;
