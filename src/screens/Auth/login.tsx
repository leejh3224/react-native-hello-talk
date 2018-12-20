import * as React from "react";
import {
  View,
  ImageBackground,
  Dimensions,
  TouchableOpacity,
  Text,
  Image
} from "react-native";
import { Google, Constants } from "expo";
import * as firebase from "firebase";
import { NavigationScreenProps } from "react-navigation";
import { getNavigationKey } from "lib";
import { colors } from "theme";
import helloTalkImage from "../../../assets/images/hello-talk.png";

const window = Dimensions.get("window");

class AuthLogin extends React.Component<NavigationScreenProps> {
  signIn = async () => {
    try {
      /**
       * To suppress Property 'idToken'/'accessToken' does not exist on type 'LogInResult',
       * cast its type as any
       * TODO: fix any type
       */
      const { idToken, accessToken }: any = await Google.logInAsync({
        iosClientId: Constants.manifest.extra!.googleOAuth.iOSClientId,
        scopes: ["profile", "email"],
        behavior: "web"
      });

      const credential = firebase.auth.GoogleAuthProvider.credential(
        idToken,
        accessToken
      );

      const user = await firebase
        .auth()
        .signInAndRetrieveDataWithCredential(credential);

      const { navigation } = this.props;

      if (user) {
        navigation.navigate(getNavigationKey(["auth", "app"]));
      }
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    return (
      <ImageBackground
        source={helloTalkImage}
        style={{
          width: window.width,
          height: window.height,
          position: "absolute"
        }}
      >
        <View
          style={{
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 149, 255, 0.6)",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <TouchableOpacity
            onPress={this.signIn}
            style={{
              flexDirection: "row",
              alignItems: "center",
              padding: 16,
              backgroundColor: "white",
              borderRadius: 10
            }}
          >
            <Image
              source={require("../../../assets/images/google.png")}
              style={{ width: 40, height: 40, marginRight: 16 }}
            />
            <Text style={{ color: colors.darkGray, fontSize: 20 }}>
              구글 계정으로 로그인하기
            </Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    );
  }
}

export default AuthLogin;
