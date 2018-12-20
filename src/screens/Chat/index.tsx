import { createStackNavigator } from "react-navigation";
import { getNavigationKey, globalHeaderConfig } from "lib";
import { ChatHomeScreen } from "./home";
import { ChatRoomScreen } from "./room";
import { ChatCreateScreen } from "./create";
import { ChatFindFriendScreen } from "./findFriend";

const { create, findFriend, home, room } = getNavigationKey(["chat"]);

export default createStackNavigator(
  {
    [home]: ChatHomeScreen,
    [room]: ChatRoomScreen,
    [create]: ChatCreateScreen,
    [findFriend]: ChatFindFriendScreen
  },
  {
    initialRouteName: home,
    navigationOptions: globalHeaderConfig
  }
);
