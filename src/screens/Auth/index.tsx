import { createStackNavigator } from "react-navigation";
import { getNavigationKey } from "lib";
import { AuthLoadingScreen } from "./loading";
import { AuthLoginScreen } from "./login";

const { loading, login } = getNavigationKey(["auth"]);

export default createStackNavigator(
  {
    [loading]: AuthLoadingScreen,
    [login]: AuthLoginScreen
  },
  {
    initialRouteName: loading,
    headerMode: "none"
  }
);
