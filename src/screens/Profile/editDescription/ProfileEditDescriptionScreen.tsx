import * as React from "react";
import { View, Text, StyleSheet } from "react-native";
import { globalHeaderConfig } from "lib";
import ProfileEditDescription from "./ProfileEditDescription";
import { colors } from "theme";
import { BackButton } from "components";

const ProfileEditDescriptionScreen = {
  screen: ProfileEditDescription,
  navigationOptions: () => {
    const styles = StyleSheet.create({
      headerLeftContainer: { flexDirection: "row", alignItems: "center" },
      headerLeftTitle: {
        fontSize: 24,
        marginLeft: 16
      },
      headerRightContainer: {
        paddingRight: 16
      },
      headerRightText: {
        color: colors.gray,
        fontSize: 16,
        fontWeight: "bold"
      }
    });

    return {
      headerStyle: {
        ...globalHeaderConfig,
        backgroundColor: colors.white
      },
      headerLeft: (
        <View style={styles.headerLeftContainer}>
          <BackButton path={["profile", "home"]} showTabBar />
          <Text style={styles.headerLeftTitle}>자기 소개</Text>
        </View>
      ),
      headerRight: (
        <View style={styles.headerRightContainer}>
          <Text style={styles.headerRightText}>OK</Text>
        </View>
      )
    };
  }
};

export default ProfileEditDescriptionScreen;
