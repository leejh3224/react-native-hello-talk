import * as React from "react";
import { View, Text, StyleSheet } from "react-native";
import { NavigationParams, NavigationScreenProps } from "react-navigation";
import { connect } from "react-redux";
import { getHoursAndMinutes } from "lib";
import { colors } from "theme";
import { AppState } from "store/modules";
import { Chat } from "models/Chat";
import { BackButton } from "components";
import ChatRoom from "./ChatRoom";

interface HeaderLeftProps {
  navigation: NavigationParams;
  chats: {
    [key: string]: Chat;
  };
}

const HeaderLeft: React.SFC<HeaderLeftProps> = ({ navigation, chats }) => {
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

  const chatId = navigation.getParam("chatId");

  if (chats[chatId]) {
    const { title, timestamp } = chats[chatId];

    return (
      <View style={styles.container}>
        <BackButton path={["chat", "home"]} showTabBar />
        <View>
          <Text style={styles.title}>{title}</Text>
          {timestamp && (
            <Text style={styles.subtitle}>{getHoursAndMinutes(timestamp)}</Text>
          )}
        </View>
      </View>
    );
  }

  return null;
};

const mapStateToProps = (state: AppState) => ({
  chats: state.chats.chats
});

const ConnectedHeaderLeft = connect(
  mapStateToProps,
  null
)(HeaderLeft);

const ChatRoomScreen = {
  screen: ChatRoom,
  navigationOptions: ({ navigation }: NavigationScreenProps) => {
    return {
      headerLeft: <ConnectedHeaderLeft navigation={navigation} />
    };
  }
};

export default ChatRoomScreen;
