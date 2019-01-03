import * as React from "react";
import {
  Text,
  StyleSheet,
  TextStyle,
  View,
  Image,
  ImageStyle
} from "react-native";
import { createStackNavigator } from "react-navigation";
import Flag from "react-native-round-flags";
import { colors } from "theme";
import { ScaleBar } from "components";
import Home from "./home";

export default createStackNavigator(
  {
    Home
  },
  {
    initialRouteName: "Home",
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
          padding: 32,
          margin: 16,
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
          top: 40,
          alignSelf: "center"
        },
        profileImage: {
          width: 100,
          height: 100,
          borderRadius: 50,
          marginRight: 16
        },
        profileContentContainer: {
          maxWidth: 180,
          justifyContent: "space-evenly",
          flex: 1
        },
        profileTitle: {
          fontSize: 24,
          fontWeight: "bold",
          marginBottom: 8
        },
        profileDescription: {
          fontSize: 16,
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
          shadowColor: "transparent",
          elevation: 0,
          borderBottomWidth: 0
        },
        headerLeft: <Text style={styles.navBarTitle as TextStyle}>프로필</Text>,
        headerBackground: (
          <Image
            source={require("../../../assets/images/banana.jpg")}
            style={{ height: 150, flex: 1, opacity: 0.8 }}
          />
        ),
        headerTitle: (
          <View style={styles.profileContainer}>
            <View
              style={{
                position: "relative"
              }}
            >
              <Image
                source={{
                  uri:
                    "https://m.media-amazon.com/images/M/MV5BMjM3MjM3NTAxM15BMl5BanBnXkFtZTgwMTY0Nzg2OTE@._V1_UX214_CR0,0,214,317_AL_.jpg"
                }}
                style={styles.profileImage as ImageStyle}
              />
              <Flag
                code="DE"
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  width: 30,
                  height: 30
                }}
              />
            </View>
            <View style={styles.profileContentContainer}>
              <Text
                style={styles.profileTitle}
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                정수한무두루미와도깨비알라알리
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  marginBottom: 8
                }}
              >
                <ScaleBar label="EN" scale={5} barColor={colors.primary} />
                <Text style={{ marginHorizontal: 8 }}>></Text>
                <ScaleBar label="KR" scale={1} barColor={colors.secondary} />
              </View>
              <Text style={styles.profileDescription}>@ID: 102924242433</Text>
              <Text style={styles.profileDescription}>Seoul, Korea</Text>
            </View>
          </View>
        )
      };
    }
  }
);
