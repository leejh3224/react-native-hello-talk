import * as React from "react";
import { Text, StyleSheet, TextStyle, View, Image } from "react-native";
import { colors } from "theme";
import { ScaleBar, ProfileImage } from "components";
import ProfileHome from "./ProfileHome";

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
        padding: 16,
        marginTop: 16,
        flexDirection: "row",
        // shadow
        shadowColor: colors.black,
        shadowOffset: {
          width: 0,
          height: 3
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,
        elevation: 6,
        position: "absolute",
        top: 56,
        alignSelf: "center",
        alignItems: "center"
      },
      profileTitle: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 8,
        maxWidth: 180
      },
      profileDescription: {
        fontSize: 14,
        color: colors.gray
      },
      scaleBar: {
        width: 40,
        height: 5,
        backgroundColor: colors.gray,
        borderRadius: 5
      }
    });

    return {
      headerStyle: {
        height: 150,
        // no-bottom-shadow
        shadowColor: "transparent",
        elevation: 0,
        borderBottomWidth: 0,
        backgroundColor: colors.primary
      },
      headerLeft: <Text style={styles.navBarTitle as TextStyle}>프로필</Text>,
      headerTitle: (
        <View style={styles.profileContainer}>
          <ProfileImage
            uri="https://m.media-amazon.com/images/M/MV5BMjM3MjM3NTAxM15BMl5BanBnXkFtZTgwMTY0Nzg2OTE@._V1_UX214_CR0,0,214,317_AL_.jpg"
            size={80}
            country="DE"
            containerStyle={{
              marginRight: 16
            }}
          />
          <View>
            <View style={{ flexDirection: "row" }}>
              <Text style={styles.profileTitle} numberOfLines={2}>
                정수한무두루미와도깨비알라알리알라셩알라리알라
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                marginBottom: 8
              }}
            >
              <ScaleBar label="EN" scale={4} barColor={colors.primary} />
              <Text style={{ marginHorizontal: 8 }}>></Text>
              <ScaleBar label="KR" scale={1} barColor={colors.secondary} />
            </View>
            <Text style={styles.profileDescription}>Seoul, Korea</Text>
          </View>
        </View>
      )
    };
  }
};

export default ProfileHomeScreen;
