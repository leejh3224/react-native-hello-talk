import * as React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import * as firebase from "firebase";
import { connect } from "react-redux";
import { globalHeaderConfig, getNavigationKey } from "lib";
import { colors } from "theme";
import { BackButton } from "components";
import { setBottomTabBarVisibility } from "store/modules/ui";
import ProfileEditDescription from "./ProfileEditDescription";

const ProfileEditDescriptionScreen = {
  screen: ProfileEditDescription,
  navigationOptions: ({ navigation }) => {
    const OKButtonDisabled =
      navigation.getParam("originalDescription") ===
      navigation.getParam("editedDescription");

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
        color: OKButtonDisabled ? colors.gray : colors.black,
        fontSize: 16,
        fontWeight: "bold"
      }
    });

    const OKButton = props => {
      return (
        <TouchableOpacity
          style={styles.headerRightContainer}
          onPress={() => {
            const newDescription = navigation.getParam("editedDescription");
            const user = firebase.auth().currentUser;

            firebase
              .database()
              .ref(`users/${user.uid}`)
              .update({ description: newDescription });

            navigation.navigate(getNavigationKey(["profile", "home"]));
            props.setBottomTabBarVisibility(true);
          }}
          disabled={OKButtonDisabled}
        >
          <Text style={styles.headerRightText}>OK</Text>
        </TouchableOpacity>
      );
    };

    const ConnectedOKButton = connect(
      null,
      { setBottomTabBarVisibility }
    )(OKButton);

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
      headerRight: <ConnectedOKButton />
    };
  }
};

export default ProfileEditDescriptionScreen;
