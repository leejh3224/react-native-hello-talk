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
    firebase.auth().onAuthStateChanged(user => {
      const { navigation } = this.props;

      return navigation.navigate(
        user
          ? getNavigationKey(["chat", "home"])
          : getNavigationKey(["auth", "login"])
      );
    });
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
