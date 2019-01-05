/**
 * Android polyfill for js intl class
 * https://github.com/facebook/react-native/issues/15382
 */
import "intl";
import "intl/locale-data/jsonp/ko";
import * as React from "react";
import {
  createBottomTabNavigator,
  createSwitchNavigator
} from "react-navigation";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { MenuProvider } from "react-native-popup-menu";
import { Provider } from "react-redux";
import { ChatScreen, AuthScreen, ProfileScreen } from "screens";
import configureStore from "store";
import { colors } from "theme";
import "lib/initFirebase";

const MainFlow = createBottomTabNavigator(
  {
    Chat: ChatScreen,
    Profile: ProfileScreen
  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }: any) => {
        const { routeName } = navigation.state;
        let iconName = "";

        if (routeName === "Chat") {
          iconName = `message${focused ? "" : "-outline"}`;
        } else if (routeName === "Profile") {
          iconName = "account";
        }

        return (
          <MaterialCommunityIcons
            name={iconName}
            size={horizontal ? 20 : 25}
            color={tintColor}
          />
        );
      },
      tabBarVisible: (() => {
        const { ui } = store.getState();

        return ui.bottomTabBarVisible;
      })()
    }),
    tabBarOptions: {
      activeTintColor: colors.primary,
      inactiveTintColor: colors.gray
    },
    initialRouteName: "Chat"
  }
);

const App = createSwitchNavigator(
  {
    Auth: AuthScreen,
    Main: MainFlow
  },
  {
    initialRouteName: "Auth"
  }
);

const store = configureStore();

export default () => {
  return (
    <Provider store={store}>
      <MenuProvider>
        <App />
      </MenuProvider>
    </Provider>
  );
};
