import * as React from "react";
import { ScrollView, View, Text } from "react-native";
import { colors } from "theme";

class ProfileHome extends React.Component {
  render() {
    return (
      <ScrollView
        style={{
          marginTop: 90
        }}
      >
        <View
          style={{
            marginBottom: 16,
            backgroundColor: colors.white,
            padding: 16
          }}
        >
          <Text
            style={{
              fontSize: 20,
              fontWeight: "bold",
              marginBottom: 16
            }}
          >
            자기 소개
          </Text>
          <Text
            style={{
              color: colors.darkGray,
              fontSize: 18
            }}
          >
            Hello, everyone :)
          </Text>
        </View>
        <View
          style={{
            marginBottom: 16,
            backgroundColor: colors.white,
            padding: 16,
            alignItems: "center"
          }}
        >
          <Text
            style={{
              color: colors.warning,
              fontSize: 20
            }}
          >
            로그아웃
          </Text>
        </View>
      </ScrollView>
    );
  }
}

export default ProfileHome;
