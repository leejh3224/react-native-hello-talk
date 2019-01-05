import * as React from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableWithoutFeedback,
  TouchableOpacity
} from "react-native";
import { MaterialCommunityIcons, Entypo } from "@expo/vector-icons";
import { BackButton } from "components";
import { globalHeaderConfig } from "lib";
import { colors } from "theme";

class AuthRegister extends React.Component {
  render() {
    const styles = StyleSheet.create({
      textInputContainer: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 8,
        borderBottomColor: colors.gray,
        borderBottomWidth: 2
      },
      textInput: {
        fontSize: 18
      }
    });

    return (
      <View
        style={{
          flex: 1,
          backgroundColor: colors.white,
          paddingHorizontal: 32,
          paddingVertical: 16
        }}
      >
        <View style={styles.textInputContainer}>
          <MaterialCommunityIcons
            name="account-outline"
            color={colors.gray}
            size={32}
            style={{ marginRight: 16 }}
          />
          <TextInput placeholder="이름" style={styles.textInput} />
        </View>
        <TouchableWithoutFeedback>
          <View style={styles.textInputContainer}>
            <MaterialCommunityIcons
              name="cake-layered"
              color={colors.gray}
              size={32}
              style={{ marginRight: 16 }}
            />
            <Text style={{ fontSize: 18, color: colors.gray }}>생일</Text>
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback>
          <View style={styles.textInputContainer}>
            <MaterialCommunityIcons
              name="flag-outline"
              color={colors.gray}
              size={32}
              style={{ marginRight: 16 }}
            />
            <Text style={{ fontSize: 18, color: colors.gray }}>
              국가 (선택)
            </Text>
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback>
          <View style={styles.textInputContainer}>
            <Entypo
              name="language"
              color={colors.gray}
              size={32}
              style={{ marginRight: 16 }}
            />
            <Text style={{ fontSize: 18, color: colors.gray }}>모국어</Text>
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback>
          <View style={styles.textInputContainer}>
            <Entypo
              name="language"
              color={colors.gray}
              size={32}
              style={{ marginRight: 16 }}
            />
            <Text style={{ fontSize: 18, color: colors.gray }}>학습 언어</Text>
          </View>
        </TouchableWithoutFeedback>
        <View
          style={{
            paddingVertical: 32,
            paddingHorizontal: 60,
            flexDirection: "row",
            justifyContent: "space-around"
          }}
        >
          <TouchableWithoutFeedback>
            <View
              style={{
                width: 60,
                height: 60,
                borderRadius: 30,
                backgroundColor: colors.lightGray,
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <MaterialCommunityIcons
                name="human-male"
                color={colors.gray}
                size={40}
              />
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback>
            <View
              style={{
                width: 60,
                height: 60,
                borderRadius: 30,
                backgroundColor: colors.lightGray,
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <MaterialCommunityIcons
                name="human-female"
                color={colors.gray}
                size={40}
              />
            </View>
          </TouchableWithoutFeedback>
        </View>
        <TouchableOpacity
          style={{
            padding: 16,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: colors.primary,
            borderRadius: 3,
            opacity: 0.3
          }}
          disabled
        >
          <Text style={{ fontSize: 20, color: colors.white }}>완료</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export const AuthRegisterScreen = {
  screen: AuthRegister,
  navigationOptions: () => {
    const styles = StyleSheet.create({
      titleContainer: {
        flex: 1,
        alignItems: "flex-start"
      },
      title: {
        fontSize: 24,
        fontWeight: "bold"
      }
    });

    return {
      headerLeft: <BackButton path={["auth", "login"]} showTabBar />,
      headerTitle: (
        <View style={styles.titleContainer}>
          <Text style={styles.title}>가입</Text>
        </View>
      ),
      headerStyle: {
        ...globalHeaderConfig,
        // no-bottom-shadow
        shadowColor: "transparent",
        elevation: 0,
        borderBottomWidth: 0
      }
    };
  }
};

export default AuthRegister;
