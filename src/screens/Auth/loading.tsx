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
    firebase.auth().onAuthStateChanged(async user => {
      const { navigation } = this.props;

      if (!user) {
        return navigation.navigate(getNavigationKey(["auth", "login"]));
      }

      const firebaseUser = await firebase
        .database()
        .ref(`users/${user.uid}`)
        .once("value");

      if (firebaseUser.exists()) {
        return navigation.navigate(getNavigationKey(["chat", "home"]));
      }
      return navigation.navigate(getNavigationKey(["auth", "register"]), {
        userData: user
      });
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
