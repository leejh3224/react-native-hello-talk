import * as React from "react";
import {
  createBottomTabNavigator,
  createStackNavigator
} from "react-navigation";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { MenuProvider } from "react-native-popup-menu";
import { Provider } from "react-redux";
import { ChatScreen, FeedScreen, AuthScreen } from "screens";
import configureStore from "store";
import { colors } from "theme";
import "lib/initFirebase";

/**
 * displayName: "Junhyung Lee"
 * email:"junhyung3224@gmail.com"
 * phoneNumber:null
 * photoURL: "https://lh3.googleusercontent.com/-jX6pEsnoX6U/AAAAAAAAAAI/AAAAAAAAAAA/AKxrwcZqFNZk_xNJ50neu8X-SoNC_m6Ddw/s96-c/photo.jpg"
 * providerId: "google.com"
 * uid: "101669882281461678010"
 */
const MainFlow = createBottomTabNavigator(
  {
    Chat: ChatScreen,
    Feed: FeedScreen
  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }: any) => {
        const { routeName } = navigation.state;
        let iconName = "";

        if (routeName === "Chat") {
          iconName = `message${focused ? "" : "-outline"}`;
        } else if (routeName === "Feed") {
          iconName = "earth";
        }

        return (
          <MaterialCommunityIcons
            name={iconName}
            size={horizontal ? 20 : 25}
            color={tintColor}
          />
        );
      }
    }),
    tabBarOptions: {
      activeTintColor: colors.primary,
      inactiveTintColor: colors.gray
    },
    initialRouteName: "Chat"
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
