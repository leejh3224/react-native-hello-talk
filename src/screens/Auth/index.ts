import { createStackNavigator } from "react-navigation";
import { getNavigationKey } from "lib";
import { ChatHomeScreen } from "screens/Chat/home";
import { AuthLoadingScreen } from "./loading";
import { AuthLoginScreen } from "./login";

const { loading, login, app } = getNavigationKey(["auth"]);

export default createStackNavigator(
  {
    [loading]: AuthLoadingScreen,
    [login]: AuthLoginScreen,
    [app]: ChatHomeScreen
  },
  {
    initialRouteName: loading
  }
);
