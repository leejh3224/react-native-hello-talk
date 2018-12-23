import * as React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  ImageStyle,
  KeyboardAvoidingView,
  TextInput,
  Platform,
  Dimensions,
  TouchableOpacity
} from "react-native";
import { NavigationScreenProps } from "react-navigation";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { colors } from "theme";
import chats from "mocks/chats.json";

class ChatRoom extends React.Component<NavigationScreenProps> {
  state = {
    text: ""
  };

  handleChangeText = (text: string) => {
    this.setState(prev => ({
      ...prev,
      text
    }));
  };

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

    const Message = () => (
      <View style={styles.messageContainer}>
        <Text style={styles.message}>{item.message}</Text>
      </View>
    );

    const Profile = () => (
      <Image
        source={{
          uri:
            "https://www.profiletalent.com.au/wp-content/uploads/2017/05/profile-talent-ant-simpson-feature.jpg"
        }}
        style={styles.profileImage as ImageStyle}
      />
    );

    const MyChat = () => {
      return (
        <View
          style={{
            ...(styles.container as object),
            alignSelf: "flex-start"
          }}
        >
          <Profile />
          <Message />
        </View>
      );
    };

    const OthersChat = () => {
      return (
        <View
          style={{
            ...(styles.container as object),
            alignSelf: "flex-end"
          }}
        >
          <Message />
          <Profile />
        </View>
      );
    };

    return index % 2 !== 1 ? <MyChat /> : <OthersChat />;
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

    // iPhoneX support
    const dimension = Dimensions.get("window");
    const isIPhoneX =
      Platform.OS === "ios" &&
      (dimension.height > 800 || dimension.width > 800);

    return (
      <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
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
        <View
          style={{
            padding: 8,
            backgroundColor: colors.white,
            paddingBottom: isIPhoneX ? 36 : 8,
            flexDirection: "row"
          }}
        >
          <TextInput
            placeholder="메세지를 입력하세요."
            style={{
              borderRadius: 20,
              padding: 8,
              backgroundColor: colors.white,
              borderColor: colors.gray,
              borderWidth: 0.5,
              flex: 1,
              marginRight: 8
            }}
            onChangeText={this.handleChangeText}
          />
          <TouchableOpacity disabled={this.state.text.length <= 0}>
            <MaterialCommunityIcons
              name="send"
              size={32}
              color={this.state.text.length <= 0 ? colors.gray : colors.primary}
            />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

export default ChatRoom;
