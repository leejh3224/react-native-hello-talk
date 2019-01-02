import { createStackNavigator } from "react-navigation";
import { getNavigationKey, globalHeaderConfig } from "lib";
import { ChatHomeScreen } from "./home";
import { ChatRoomScreen } from "./room";
import { ChatCreateScreen } from "./create";
import {
  ChatFindFriendScreen,
  ChatSelectCountryScreen,
  ChatSelectLanguageScreen,
  ChatFriendsListScreen
} from "./findFriend";

const {
  create,
  findFriend,
  home,
  room,
  selectCountry,
  selectLanguage,
  friendsList
} = getNavigationKey(["chat"]);

export default createStackNavigator(
  {
    [home]: ChatHomeScreen,
    [room]: ChatRoomScreen,
    [create]: ChatCreateScreen,
    [findFriend]: ChatFindFriendScreen,
    [selectCountry]: ChatSelectCountryScreen,
    [selectLanguage]: ChatSelectLanguageScreen,
    [friendsList]: ChatFriendsListScreen
  },
  {
    initialRouteName: home,
    navigationOptions: globalHeaderConfig
  }
);
