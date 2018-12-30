import { createStackNavigator } from "react-navigation";
import { getNavigationKey, globalHeaderConfig } from "lib";
import { ChatHomeScreen } from "./home";
import { ChatRoomScreen } from "./room";
import { ChatCreateScreen } from "./create";
import {
  ChatFindFriendScreen,
  ChatSelectCountryScreen,
  ChatSelectLanguageScreen
} from "./findFriend";

const {
  create,
  findFriend,
  home,
  room,
  selectCountry,
  selectLanguage
} = getNavigationKey(["chat"]);

export default createStackNavigator(
  {
    [home]: ChatHomeScreen,
    [room]: ChatRoomScreen,
    [create]: ChatCreateScreen,
    [findFriend]: ChatFindFriendScreen,
    [selectCountry]: ChatSelectCountryScreen,
    [selectLanguage]: ChatSelectLanguageScreen
  },
  {
    initialRouteName: home,
    navigationOptions: globalHeaderConfig
  }
);
