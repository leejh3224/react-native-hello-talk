import * as React from "react";
import { View, Text, StyleSheet } from "react-native";
import {
  NavigationScreenProps,
  NavigationParams,
  HeaderBackButton
} from "react-navigation";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { connect } from "react-redux";
import { getNavigationKey, getHoursAndMinutes } from "lib";
import { colors } from "theme";
import { setBottomTabBarVisibility } from "store/modules/ui";
import { AppState } from "store/modules";
import { Chat } from "models/Chat";
import ChatRoom from "./ChatRoom";

interface BackButtonProps {
  navigation: NavigationParams;
  setBottomTabBarVisibility: typeof setBottomTabBarVisibility;
  chats: {
    [key: string]: Chat;
  };
}

const BackButton: React.SFC<BackButtonProps> = ({
  navigation,
  chats,
  ...props
}) => {
  const styles = StyleSheet.create({
    container: {
      flexDirection: "row",
      alignItems: "center"
    },
    title: {
      fontSize: 24,
      fontWeight: "bold"
    },
    subtitle: {
      color: colors.gray
    }
  });

  const chatId = navigation.getParam("chatId", "default-chatId");
  const { title, timestamp } = chats[chatId];

  return (
    <View style={styles.container}>
      <HeaderBackButton
        onPress={() => {
          navigation.navigate(getNavigationKey(["chat", "home"]));
          props.setBottomTabBarVisibility(true);
        }}
      />
      <View>
        <Text style={styles.title}>{title}</Text>
        {timestamp && (
          <Text style={styles.subtitle}>{getHoursAndMinutes(timestamp)}</Text>
        )}
      </View>
    </View>
  );
};

const mapStateToProps = (state: AppState) => ({
  chats: state.chats.chats
});

const ConnectedBackButton = connect(
  mapStateToProps,
  { setBottomTabBarVisibility }
)(BackButton);

const ChatRoomScreen = {
  screen: ChatRoom,
  navigationOptions: ({ navigation }: NavigationScreenProps) => {
    const styles = StyleSheet.create({
      container: {
        flexDirection: "row",
        alignItems: "center"
      },
      title: {
        fontSize: 24,
        fontWeight: "bold"
      },
      subtitle: {
        color: colors.gray
      }
    });

    return {
      headerLeft: <ConnectedBackButton navigation={navigation} />,
      headerRight: (
        <View style={{ ...(styles.container as object), marginRight: 16 }}>
          <MaterialCommunityIcons
            name="magnify"
            size={32}
            style={{ marginRight: 16 }}
          />
          <MaterialCommunityIcons name="settings" size={32} />
        </View>
      )
    };
  }
};

export default ChatRoomScreen;
