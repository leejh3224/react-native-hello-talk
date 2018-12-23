import * as React from "react";
import {
  View,
  ImageBackground,
  Dimensions,
  TouchableOpacity,
  Text,
  Image
} from "react-native";
import { NavigationScreenProps } from "react-navigation";
import Toast from "react-native-easy-toast";
import { getNavigationKey } from "lib";
import { colors } from "theme";
import * as firebase from "firebase";
import api from "api";
import helloTalkImage from "../../../assets/images/hello-talk.png";

const window = Dimensions.get("window");

class AuthLogin extends React.Component<NavigationScreenProps> {
  state = {
    loginInProgress: false
  };

  signIn = async () => {
    try {
      this.setState(prev => ({
        ...prev,
        loginInProgress: true
      }));

      const user = await api.googleOAuth();

      console.log(firebase.auth().currentUser);

      const { navigation } = this.props;

      if (user) {
        navigation.navigate(getNavigationKey(["chat", "home"]));
      }
    } catch (error) {
      console.log(error);

      this.setState(prev => ({
        ...prev,
        loginInProgress: false
      }));

      // react-native-easy-toast does not provide @types
      (this.refs.errorToast as any).show(error.message);
    }
  };

  render() {
    const { loginInProgress } = this.state;

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
            disabled={loginInProgress}
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
  screen: AuthLogin
};

export default AuthLogin;