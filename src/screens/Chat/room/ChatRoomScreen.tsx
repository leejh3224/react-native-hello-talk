import * as React from "react";
import { View, Text, StyleSheet } from "react-native";
import {
  NavigationScreenProps,
  NavigationParams,
  HeaderBackButton
} from "react-navigation";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { connect } from "react-redux";
import { getNavigationKey } from "lib";
import { colors } from "theme";
import { setBottomTabBarVisibility } from "store/modules/ui";
import ChatRoom from "./ChatRoom";

interface BackButtonProps {
  navigation: NavigationParams;
  setBottomTabBarVisibility: typeof setBottomTabBarVisibility;
}

const BackButton: React.SFC<BackButtonProps> = ({ navigation, ...props }) => {
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

  return (
    <View style={styles.container}>
      <HeaderBackButton
        onPress={() => {
          navigation.navigate(getNavigationKey(["chat", "home"]));
          props.setBottomTabBarVisibility(true);
        }}
      />
      <View>
        <Text style={styles.title}>John</Text>
        <Text style={styles.subtitle}>새벽 3:44</Text>
      </View>
    </View>
  );
};

const ConnectedBackButton = connect(
  null,
  { setBottomTabBarVisibility }
)(BackButton);

const ChatRoomScreen = {
  screen: ChatRoom,
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
      headerLeft: <ConnectedBackButton navigation={navigation} />,
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
};

export default ChatRoomScreen;
