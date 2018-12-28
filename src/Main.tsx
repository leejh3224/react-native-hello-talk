import * as React from "react";
import {
  createBottomTabNavigator,
  createStackNavigator
} from "react-navigation";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
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
    initialRouteName: "Profile"
  }
);

const App = createStackNavigator(
  {
    Auth: AuthScreen,
    Main: MainFlow
  },
  {
    initialRouteName: "Auth",
    headerMode: "none"
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
