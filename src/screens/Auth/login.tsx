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
import Toast from "react-native-easy-toast";
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
      // react-native-easy-toast does not provide @types
      (this.refs.errorToast as any).show(error.message);
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
              backgroundColor: colors.white,
              borderRadius: 10,
              // shadow
              shadowColor: colors.black,
              shadowOffset: {
                width: 0,
                height: 3
              },
              shadowOpacity: 0.27,
              shadowRadius: 4.65,
              elevation: 6
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
          <Toast
            ref="errorToast"
            style={{ backgroundColor: colors.warning, paddingHorizontal: 16 }}
            textStyle={{ color: colors.white, fontSize: 18 }}
          />
        </View>
      </ImageBackground>
    );
  }
}

export const AuthLoginScreen = {
  screen: AuthLogin,
  navigationOptions: {
    header: null
  }
};

export default AuthLogin;
