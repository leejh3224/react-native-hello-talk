import * as React from "react";
import { Text, TouchableOpacity } from "react-native";
import { NavigationScreenProps } from "react-navigation";
import { connect } from "react-redux";
import uuid from "uuid/v4";
import { getNavigationKey } from "lib";
import { User } from "models/User";
import { createChat } from "store/modules/chat";
import { setBottomTabBarVisibility } from "store/modules/ui";
import ChatCreate from "./ChatCreate";

const ChatCreateScreen = {
  screen: ChatCreate,
  navigationOptions: ({ navigation }: NavigationScreenProps) => {
    const selected = navigation.getParam("selected", []) as User[];
    const OKButton = (props: any) => {
      const newChatId = uuid();

      return (
        <TouchableOpacity
          onPress={() => {
            // TODO: create /chats child key and pass it to room
            props.createChatRequest({
              chatId: newChatId,
              selected,
              title: selected[0].name
            });
            navigation.navigate(getNavigationKey(["chat", "room"]), {
              chatId: newChatId
            });
            props.setBottomTabBarVisibility(false);
          }}
          disabled={selected.length <= 0}
        >
          <Text
            style={{
              marginRight: 16,
              fontSize: 20,
              fontWeight: "bold"
            }}
          >
            OK {selected.length > 0 && `(${selected.length})`}
          </Text>
        </TouchableOpacity>
      );
    };

    const ConnectedOKButton = connect(
      null,
      { setBottomTabBarVisibility, createChatRequest: createChat.request }
    )(OKButton);

    return {
      title: "create",
      headerRight: <ConnectedOKButton />
    };
  }
};

export default ChatCreateScreen;
