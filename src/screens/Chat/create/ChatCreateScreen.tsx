import * as React from "react";
import { Text, TouchableOpacity } from "react-native";
import { NavigationScreenProps } from "react-navigation";
import { connect } from "react-redux";
import { getNavigationKey } from "lib";
import { User } from "models/User";
import { createChat } from "store/modules/chat";
import ChatCreate from "./ChatCreate";

const ChatCreateScreen = {
  screen: ChatCreate,
  navigationOptions: ({ navigation }: NavigationScreenProps) => {
    const selected = navigation.getParam("selected", []) as User[];

    const OKButton = ({ createChatRequest }: any) => {
      return (
        <TouchableOpacity
          onPress={() => {
            createChatRequest(selected);
            navigation.navigate(getNavigationKey(["chat", "room"]));
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
      { createChatRequest: createChat.request }
    )(OKButton);

    return {
      title: "create",
      headerRight: <ConnectedOKButton />
    };
  }
};

export default ChatCreateScreen;
