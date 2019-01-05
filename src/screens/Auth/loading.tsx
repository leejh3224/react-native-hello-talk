import * as React from "react";
import { Text, ImageBackground, Dimensions } from "react-native";
import * as firebase from "firebase";
import { NavigationScreenProps } from "react-navigation";
import { getNavigationKey } from "lib";
import { colors } from "theme";

class AuthLoading extends React.Component<NavigationScreenProps> {
  constructor(props: any) {
    super(props);
    this.bootstrap();
  }

  bootstrap = () => {
    const { currentUser } = firebase.auth();
    const { navigation } = this.props;

    // TODO: remove development setting
    if (process.env.NODE_ENV !== "development") {
      return navigation.navigate(
        currentUser
          ? getNavigationKey(["auth", "login"])
          : getNavigationKey(["chat", "home"])
      );
    }

    return navigation.navigate(
      currentUser
        ? getNavigationKey(["chat", "home"])
        : getNavigationKey(["auth", "login"])
    );
  };

  render() {
    const window = Dimensions.get("window");
    return (
      <ImageBackground
        source={require("../../../assets/images/hello-talk.png")}
        style={{
          width: window.width,
          height: window.height,
          position: "absolute",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <Text
          style={{
            fontSize: 32,
            color: colors.white
          }}
        >
          Loading user...
        </Text>
      </ImageBackground>
    );
  }
}

export const AuthLoadingScreen = {
  screen: AuthLoading,
  navigationOptions: {
    header: null
  }
};

export default AuthLoading;
