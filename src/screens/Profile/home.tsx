import * as React from "react";
import { View, Text, StyleSheet, Image, ImageStyle } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { colors } from "theme";

class ProfileHome extends React.Component {
  render() {
    return (
      <View>
        <View>
          <View
            style={{
              marginBottom: 16,
              backgroundColor: colors.white,
              padding: 16,
              marginTop: 90
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
              flexDirection: "row",
              alignItems: "center"
            }}
          >
            <MaterialCommunityIcons
              name="settings"
              size={28}
              color={colors.primary}
            />
            <Text style={{ fontSize: 20, marginLeft: 16 }}>설정</Text>
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
        </View>
      </View>
    );
  }
}

export default ProfileHome;
