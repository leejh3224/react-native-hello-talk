import * as React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Dimensions
} from "react-native";
import {
  createStackNavigator,
  NavigationScreenProps,
  HeaderBackButton
} from "react-navigation";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { colors } from "theme";
import { getNavigationKey } from "lib";
import { ChatHomeScreen } from "./home";
import Room from "./room";
import Create from "./create";
import FindFriend from "./findFriend";

const { create, findFriend, home, room } = getNavigationKey(["chat"]);

export default createStackNavigator(
  {
    [home]: ChatHomeScreen,
    [room]: {
      screen: Room,
      navigationOptions: ({ navigation }: NavigationScreenProps) => {
        const styles = StyleSheet.create({
          container: {
            flexDirection: "row",
            alignItems: "center"
          },
          title: {
            fontSize: 24,
            fontWeight: "bold"
          },
          subtitle: {
            color: colors.gray
          }
        });

        return {
          headerLeft: (
            <View style={styles.container}>
              <HeaderBackButton
                onPress={() =>
                  navigation.navigate(getNavigationKey(["chat", "home"]))
                }
              />
              <View>
                <Text style={styles.title}>John</Text>
                <Text style={styles.subtitle}>새벽 3:44</Text>
              </View>
            </View>
          ),
          headerRight: (
            <View style={{ ...(styles.container as object), marginRight: 16 }}>
              <MaterialCommunityIcons
                name="magnify"
                size={32}
                style={{ marginRight: 16 }}
              />
              <MaterialCommunityIcons name="settings" size={32} />
            </View>
          )
        };
      }
    },
    [create]: {
      screen: Create,
      navigationOptions: ({ navigation }: NavigationScreenProps) => ({
        title: "create",
        headerRight: (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate(getNavigationKey(["chat", "room"]))
            }
          >
            <Text
              style={{
                marginRight: 16,
                fontSize: 20,
                fontWeight: "bold"
              }}
            >
              OK
            </Text>
          </TouchableOpacity>
        )
      })
    },
    [findFriend]: {
      screen: FindFriend,
      navigationOptions: ({ navigation }: NavigationScreenProps) => {
        const screen = Dimensions.get("window");
        const styles = StyleSheet.create({
          input: {
            // back button size * 2
            width: screen.width - 90,
            backgroundColor: colors.lightGray,
            paddingVertical: 8,
            paddingHorizontal: 16,
            borderRadius: 10,
            fontSize: 20,
            color: colors.darkGray
          }
        });

        return {
          headerLeft: (
            <HeaderBackButton
              onPress={() =>
                navigation.navigate(getNavigationKey(["chat", "home"]))
              }
            />
          ),
          headerTitle: (
            <TextInput
              placeholder="사용자 이름/언어 (예: kr)"
              style={styles.input}
            />
          ),
          headerRight: null
        };
      }
    }
  },
  {
    initialRouteName: home,
    navigationOptions: () => ({
      headerStyle: {
        height: 68
      }
    })
  }
);
