import * as React from "react";
import { BackButton } from "components";
import ChatFriendsList from "./ChatFriendsList";
import SortByModal from "./SortByModal";

const ChatFriendsListScreen = {
  screen: ChatFriendsList,
  navigationOptions: () => {
    return {
      headerLeft: <BackButton path={["chat", "findFriend"]} />,
      headerTitle: <SortByModal />
    };
  }
};

export default ChatFriendsListScreen;
