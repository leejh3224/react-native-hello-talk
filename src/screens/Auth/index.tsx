import { createStackNavigator } from "react-navigation";
import { getNavigationKey } from "lib";
import { AuthLoadingScreen } from "./loading";
import { AuthLoginScreen } from "./login";
import { AuthRegisterScreen } from "./register";

const { loading, login, register } = getNavigationKey(["auth"]);

export default createStackNavigator(
  {
    [loading]: AuthLoadingScreen,
    [login]: AuthLoginScreen,
    [register]: AuthRegisterScreen
  },
  {
    initialRouteName: loading
  }
);
