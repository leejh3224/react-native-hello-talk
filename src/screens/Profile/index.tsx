import { createStackNavigator } from "react-navigation";
import { getNavigationKey } from "lib";
import { ProfileHomeScreen } from "./home";
import { ProfileEditDescriptionScreen } from "./editDescription";

const { home, editDescription } = getNavigationKey(["profile"]);

export default createStackNavigator(
  {
    [home]: ProfileHomeScreen,
    [editDescription]: ProfileEditDescriptionScreen
  },
  {
    initialRouteName: home
  }
);
