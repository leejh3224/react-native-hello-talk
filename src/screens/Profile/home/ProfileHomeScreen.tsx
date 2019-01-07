import * as React from "react";
import {
  View,
  Text,
  StyleSheet,
  TextStyle,
  Dimensions,
  Platform
} from "react-native";
import { colors } from "theme";
import ProfileHome from "./ProfileHome";
import ProfileBox from "./ProfileBox";

const ProfileHomeScreen = {
  screen: ProfileHome,
  navigationOptions: () => {
    const styles = StyleSheet.create({
      navBarTitle: {
        fontSize: 32,
        fontWeight: "bold",
        marginLeft: 16,
        marginTop: 16,
        color: colors.white,
        alignSelf: "flex-start"
      },
      profileContainer: {
        flex: 1,
        borderRadius: 10,
        backgroundColor: colors.white,
        paddingHorizontal: 32,
        paddingVertical: 16,
        marginTop: 16,
        // shadow
        shadowColor: colors.black,
        shadowOffset: {
          width: 0,
          height: 3
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,
        elevation: 6
      }
    });

    return {
      headerStyle: {
        height: 180,
        // no-bottom-shadow
        shadowColor: "transparent",
        elevation: 0,
        borderBottomWidth: 0,
        backgroundColor: colors.primary
      },
      headerLeft: <Text style={styles.navBarTitle as TextStyle}>프로필</Text>,
      // Profile
      headerTitle: (
        <View
          style={{
            position: "absolute",
            top: 56,
            left: 0,
            right: 0,
            justifyContent: "center",
            alignItems: "center",
            paddingRight: Platform.OS === "android" ? 48 : 0
          }}
        >
          <View style={styles.profileContainer}>
            <ProfileBox />
          </View>
        </View>
      )
    };
  }
};

export default ProfileHomeScreen;
