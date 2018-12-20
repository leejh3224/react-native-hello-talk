import { createStackNavigator } from "react-navigation";
import { getNavigationKey } from "lib";
import { ChatHomeScreen } from "screens/Chat/home";
import Loading from "./loading";
import Login from "./login";

const { loading, login, app } = getNavigationKey(["auth"]);

export default createStackNavigator(
  {
    [loading]: {
      screen: Loading,
      navigationOptions: {
        header: null
      }
    },
    [login]: {
      screen: Login,
      navigationOptions: {
        header: null
      }
    },
    [app]: ChatHomeScreen
  },
  {
    initialRouteName: loading
  }
);
