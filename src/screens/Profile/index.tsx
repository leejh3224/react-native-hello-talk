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
import Home from "./home";

export default createStackNavigator(
  {
    Home
  },
  {
    initialRouteName: "Home",
    navigationOptions: () => {
      const ScaleBar = ({ scale, barColor }) => {
        const scaleBarStyles = StyleSheet.create({
          container: {
            width: 40,
            height: 5,
            backgroundColor: colors.lightGray,
            borderRadius: 5,
            position: "relative"
          },
          bar: {
            width: 8 * scale,
            backgroundColor: barColor,
            height: 5,
            borderRadius: 5,
            position: "absolute"
          }
        });

        return (
          <View style={scaleBarStyles.container}>
            <View style={scaleBarStyles.bar} />
          </View>
        );
      };

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
          borderRadius: 10,
          backgroundColor: colors.white,
          padding: 32,
          marginVertical: 16,
          marginHorizontal: 32,
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
          justifyContent: "space-evenly"
        },
        profileTitle: {
          fontSize: 28,
          fontWeight: "bold"
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
              <Text style={styles.profileTitle}>John</Text>
              <View
                style={{
                  flexDirection: "row",
                  marginBottom: 8
                }}
              >
                <View>
                  <Text style={{ fontWeight: "600" }}>EN</Text>
                  <ScaleBar scale={5} barColor={colors.primary} />
                </View>
                <Text style={{ marginHorizontal: 8 }}>></Text>
                <View>
                  <Text style={{ fontWeight: "600" }}>KR</Text>
                  <ScaleBar scale={1} barColor={colors.secondary} />
                </View>
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
