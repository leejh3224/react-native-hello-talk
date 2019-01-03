import * as React from "react";
import {
  FlatList,
  View,
  StyleSheet,
  Text,
  TouchableOpacity
} from "react-native";
import { NavigationScreenProps } from "react-navigation";
import { connect } from "react-redux";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { getNavigationKey, getHoursAndMinutes } from "lib";
import { colors } from "theme";
import { AppState } from "store/modules";
import { setBottomTabBarVisibility } from "store/modules/ui";
import { Chat } from "models/Chat";
import { ProfileImage } from "components";

interface Props extends NavigationScreenProps {
  setBottomTabBarVisibility: typeof setBottomTabBarVisibility;
  chats: {
    [key: string]: Chat;
  };
}

class ChatHome extends React.Component<Props, {}> {
  handleRenderRow = ({ item, index }: { item: Chat; index: number }) => {
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        padding: 16,
        backgroundColor: colors.white,
        borderBottomColor: colors.gray,
        borderBottomWidth: 0.5
      },
      contentContainer: {
        flex: 1,
        justifyContent: "center"
      },
      title: {
        fontSize: 24,
        fontWeight: "bold"
      },
      subtitle: {
        maxWidth: 225,
        fontSize: 16,
        color: colors.gray,
        // TODO: find better way to restrict max lines to 2
        height: 40
      },
      timestamp: {
        color: colors.gray,
        alignSelf: "center"
      }
    });

    const { navigation, chats } = this.props;

    // TODO: onLongPress -> delete / turn off notification
    return (
      <TouchableOpacity
        style={styles.container}
        onPress={() => {
          navigation.navigate(getNavigationKey(["chat", "room"]), {
            chatId: Object.keys(chats)[index]
          });
          this.props.setBottomTabBarVisibility(false);
        }}
      >
        <ProfileImage
          uri="https://www.profiletalent.com.au/wp-content/uploads/2017/05/profile-talent-ant-simpson-feature.jpg"
          size={60}
          containerStyle={{
            marginRight: 16
          }}
        />
        <View style={styles.contentContainer}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.subtitle}>
            {item.lastMessage || "대화를 시작해보세요."}
          </Text>
        </View>
        <Text style={styles.timestamp} numberOfLines={2} ellipsizeMode="tail">
          {item.timestamp && getHoursAndMinutes(item.timestamp)}
        </Text>
      </TouchableOpacity>
    );
  };

  render() {
    const { chats } = this.props;

    return (
      <View style={{ flex: 1 }}>
        <FlatList<Chat>
          data={Object.values(chats)}
          renderItem={this.handleRenderRow}
          keyExtractor={item => item.title}
          ListEmptyComponent={() => {
            return (
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  alignSelf: "center",
                  flex: 1
                }}
              >
                <MaterialCommunityIcons
                  name="help-circle-outline"
                  color={colors.gray}
                  size={40}
                />
                <Text style={{ color: colors.gray, fontSize: 18 }}>
                  상단의 + 아이콘을 눌러 대화를 시작하세요.
                </Text>
              </View>
            );
          }}
          contentContainerStyle={{
            flexGrow: 1
          }}
        />
      </View>
    );
  }
}

const mapStateToProps = (state: AppState) => ({ chats: state.chats.chats });

export default connect(
  mapStateToProps,
  { setBottomTabBarVisibility }
)(ChatHome);
