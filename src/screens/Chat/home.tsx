import * as React from "react";
import {
  FlatList,
  View,
  Image,
  StyleSheet,
  Text,
  ImageStyle,
  TouchableOpacity
} from "react-native";
import { NavigationScreenProps } from "react-navigation";
import {
  Menu,
  MenuTrigger,
  MenuOptions,
  MenuOption
} from "react-native-popup-menu";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { getNavigationKey } from "lib";
import { colors } from "theme";
import chats from "mocks/chats.json";

class ChatHome extends React.Component<NavigationScreenProps, {}> {
  handleRenderRow = () => {
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        flexDirection: "row",
        padding: 16,
        backgroundColor: colors.white
      },
      profileImage: {
        width: 60,
        height: 60,
        borderRadius: 30,
        marginRight: 16
      },
      contentContainer: {
        flex: 1,
        justifyContent: "center"
      },
      title: {
        fontSize: 24,
        fontWeight: "bold"
      },
      subtitle: {
        fontSize: 16,
        color: "gray"
      }
    });

    const { navigation } = this.props;

    return (
      <TouchableOpacity
        style={styles.container}
        onPress={() => navigation.navigate(getNavigationKey(["chat", "room"]))}
      >
        <Image
          source={{ uri: "https://r.hswstatic.com/w_907/gif/tesla-cat.jpg" }}
          style={styles.profileImage as ImageStyle}
        />
        <View style={styles.contentContainer}>
          <Text style={styles.title}>John</Text>
          <Text style={styles.subtitle}>Hi, there?</Text>
        </View>
      </TouchableOpacity>
    );
  };

  render() {
    return (
      <FlatList
        data={chats}
        renderItem={this.handleRenderRow}
        keyExtractor={item => item.id}
      />
    );
  }
}

export const ChatHomeScreen = {
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

    return {
      headerLeft: <Text style={styles.navBarTitle}>Chat</Text>,
      headerRight: (
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
              onSelect={() =>
                navigation.navigate(getNavigationKey(["chat", "findFriend"]))
              }
            >
              <MaterialCommunityIcons name="account-plus" size={24} />
              <Text style={styles.menuText}>파트너 찾기</Text>
            </MenuOption>
            <MenuOption
              style={styles.boxListItem}
              value={2}
              onSelect={() =>
                navigation.navigate(getNavigationKey(["chat", "create"]))
              }
            >
              <MaterialCommunityIcons
                name="comment-multiple-outline"
                size={24}
              />
              <Text style={styles.menuText}>채팅 시작</Text>
            </MenuOption>
          </MenuOptions>
        </Menu>
      )
    };
  }
};

export default ChatHome;
