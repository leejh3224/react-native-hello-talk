import * as React from "react";
import { Text, TouchableOpacity } from "react-native";
import { NavigationScreenProps } from "react-navigation";
import { getNavigationKey } from "lib";
import { User } from "models/User";
import ChatCreate from "./ChatCreate";

const ChatCreateScreen = {
  screen: ChatCreate,
  navigationOptions: ({ navigation }: NavigationScreenProps) => {
    const selected = navigation.getParam("selected", []) as User[];

    return {
      title: "create",
      headerRight: (
        <TouchableOpacity
          onPress={() => {
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
      )
    };
  }
};

export default ChatCreateScreen;
