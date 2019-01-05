import * as React from "react";
import {
  View,
  ImageBackground,
  Dimensions,
  TouchableOpacity,
  Text,
  Image,
  StyleSheet,
  ImageStyle
} from "react-native";
import { NavigationScreenProps } from "react-navigation";
import Toast from "react-native-easy-toast";
import * as firebase from "firebase";
import { getNavigationKey } from "lib";
import { colors } from "theme";
import api from "api";
import helloTalkImage from "../../../assets/images/hello-talk.png";

class AuthLogin extends React.Component<NavigationScreenProps> {
  state = {
    loginInProgress: false
  };

  signIn = async () => {
    try {
      const { user } = await this.requestOAuth();

      if (user) {
        const { navigation } = this.props;
        // 3rd party authenticated user should go through additional register process
        const firebaseUser = await firebase
          .database()
          .ref(`users/${user.uid}`)
          .once("value");

        if (firebaseUser.exists()) {
          navigation.navigate(getNavigationKey(["chat", "home"]));
        } else {
          navigation.navigate(getNavigationKey(["auth", "register"]), {
            userData: user
          });
        }
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

  requestOAuth = () => {
    this.setState(prev => ({
      ...prev,
      loginInProgress: true
    }));

    return api.googleOAuth();
  };

  render() {
    const { loginInProgress } = this.state;
    const window = Dimensions.get("window");
    const styles = StyleSheet.create({
      background: {
        width: window.width,
        height: window.height,
        position: "absolute"
      },
      container: {
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 149, 255, 0.8)",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 16,
        paddingTop: 80,
        paddingBottom: 128
      },
      title: {
        fontSize: 42,
        fontWeight: "600",
        color: colors.white,
        alignSelf: "flex-start",
        marginBottom: 16
      },
      description: {
        fontSize: 18,
        color: colors.white,
        lineHeight: 24
      },
      loginButtonContainer: {
        flexDirection: "row",
        alignItems: "center",
        width: "100%",
        padding: 16,
        backgroundColor: colors.white,
        borderRadius: 5,
        // shadow
        shadowColor: colors.black,
        shadowOffset: {
          width: 0,
          height: 3
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,
        elevation: 6
      },
      buttonText: { color: colors.darkGray, fontSize: 20 },
      toastText: { color: colors.white, fontSize: 20 },
      googleLogo: { width: 24, height: 24, marginRight: 16 }
    });

    return (
      <ImageBackground source={helloTalkImage} style={styles.background}>
        <View style={styles.container}>
          <View>
            <Text style={styles.title}>HelloTalk</Text>
            <Text style={styles.description}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas
              venenatis erat vel sagittis tempor. Cras a purus non nibh mattis
              dignissim id a enim. Proin blandit ultricies purus, at suscipit
              nulla
            </Text>
          </View>
          <TouchableOpacity
            onPress={this.signIn}
            disabled={loginInProgress}
            style={styles.loginButtonContainer}
          >
            <Image
              source={require("../../../assets/images/google.png")}
              style={styles.googleLogo as ImageStyle}
            />
            <Text style={styles.buttonText}>구글 계정으로 로그인하기</Text>
          </TouchableOpacity>
          <Toast
            ref="errorToast"
            style={{ backgroundColor: colors.warning, paddingHorizontal: 16 }}
            textStyle={styles.toastText}
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
