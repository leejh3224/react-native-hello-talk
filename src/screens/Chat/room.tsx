import * as React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  ImageStyle
} from "react-native";
import { NavigationScreenProps, HeaderBackButton } from "react-navigation";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { colors } from "theme";
import { getNavigationKey } from "lib";
import chats from "mocks/chats.json";

class ChatRoom extends React.Component {
  handleRenderRow = ({ item, index }: any) => {
    const styles = StyleSheet.create({
      container: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 16
      },
      profileImage: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginHorizontal: 16
      },
      messageContainer: {
        backgroundColor: colors.white,
        borderRadius: 20,
        alignSelf: "flex-start",
        paddingVertical: 8,
        paddingHorizontal: 16
      },
      message: {
        fontSize: 18
      }
    });

    const Chat = ({ isReply = false }) => {
      return (
        <View
          style={{
            ...(styles.container as object),
            alignSelf: isReply ? "flex-end" : "flex-start"
          }}
        >
          {isReply ? (
            <>
              <View style={styles.messageContainer}>
                <Text style={styles.message}>{item.message}</Text>
              </View>
              <Image
                source={{
                  uri:
                    "https://www.profiletalent.com.au/wp-content/uploads/2017/05/profile-talent-ant-simpson-feature.jpg"
                }}
                style={styles.profileImage as ImageStyle}
              />
            </>
          ) : (
            <>
              <Image
                source={{
                  uri:
                    "https://www.profiletalent.com.au/wp-content/uploads/2017/05/profile-talent-ant-simpson-feature.jpg"
                }}
                style={styles.profileImage as ImageStyle}
              />
              <View style={styles.messageContainer}>
                <Text style={styles.message}>{item.message}</Text>
              </View>
            </>
          )}
        </View>
      );
    };

    return <Chat isReply={index % 2 === 1} />;
  };

  render() {
    const styles = StyleSheet.create({
      timestampContainer: {
        borderRadius: 20,
        backgroundColor: colors.gray,
        marginTop: 8,
        padding: 8,
        alignSelf: "flex-start"
      },
      timestamp: {
        color: colors.white,
        fontSize: 16,
        textAlign: "center"
      }
    });

    /**
     * Trick to fit view size to content:
     * 1. add align-self: flex-start to text container
     * 2. wrap this with view with style align-self: center
     */
    const { messages } = chats[0];
    return (
      <View>
        <View style={{ alignSelf: "center" }}>
          <View style={styles.timestampContainer}>
            <Text style={styles.timestamp}>2018.11.6 오전 8:28</Text>
          </View>
        </View>
        <FlatList
          data={messages}
          renderItem={this.handleRenderRow}
          keyExtractor={item => item.id}
        />
      </View>
    );
  }
}

export const ChatRoomScreen = {
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
};

export default ChatRoom;
