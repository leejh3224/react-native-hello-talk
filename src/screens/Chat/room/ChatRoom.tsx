import * as React from "react";
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  TextInput,
  Platform,
  Dimensions,
  TouchableOpacity,
  SectionList
} from "react-native";
import * as firebase from "firebase";
import { NavigationScreenProps } from "react-navigation";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { connect } from "react-redux";
import { ImagePicker, Permissions } from "expo";
import uuid from "uuid/v4";
import groupBy from "lodash.groupby";
import { colors } from "theme";
import { sendMessage } from "store/modules/chat";
import { Message as IMessage } from "models/Message";
import { getYearMonthAndDay } from "lib";
import ChatBubble from "./ChatBubble";

interface Props extends NavigationScreenProps {
  sendMessageRequest: typeof sendMessage.request;
  messages: {
    [key: string]: IMessage;
  };
}

interface State {
  chatId: string;
  text: string;
  uploadMenuBarVisible: boolean;
}

class ChatRoom extends React.Component<Props, State> {
  state = {
    chatId: "",
    text: "",
    uploadMenuBarVisible: false,
    user: null,
    messages: {}
  };

  private sectionList!: SectionList<IMessage>;

  componentDidMount = async () => {
    const { navigation } = this.props;
    const user = firebase.auth().currentUser;
    const firebaseUser = (await firebase
      .database()
      .ref(`users/${user.uid}`)
      .once("value")).val();
    const chatId = navigation.getParam("chatId");
    const messagesRef = firebase
      .database()
      .ref(`messages/${chatId}`)
      .orderByChild("timestamp");

    this.setState(prev => ({
      ...prev,
      user: firebaseUser
    }));

    messagesRef.on("value", snap => {
      if (snap.exists()) {
        /**
         * https://stackoverflow.com/questions/33893866/orderbychild-not-working-in-firebase
         * Firebase sorting doesn't guarantee JSON order, it is determined by js interpreter
         * so in order to preserve sorted order, we manually loop through snapshot
         */
        const ordered = {};

        snap.forEach(s => {
          ordered[s.key] = s.val();
        });

        this.setState(prev => ({
          ...prev,
          messages: ordered
        }));
      }
    });
  };

  componentWillUnmount() {
    const { navigation } = this.props;
    const chatId = navigation.getParam("chatId");
    const messagesRef = firebase.database().ref(`messages/${chatId}`);
    messagesRef.off("value");
  }

  // TODO: add animation for hiding uploadMenuBar
  toggleUploadMenuBar = () => {
    this.setState(prev => ({
      ...prev,
      uploadMenuBarVisible: !prev.uploadMenuBarVisible
    }));
  };

  askCameraRollPermission = async () => {
    // Requires Permissions.CAMERA_ROLL on iOS only.
    if (Platform.OS === "ios") {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      return status === "granted";
    }
    return true;
  };

  pickImage = async () => {
    const permission = await this.askCameraRollPermission();

    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true
    });

    if (permission && !result.cancelled) {
      const { sendMessageRequest, navigation } = this.props;
      const { user } = this.state;

      const chatId = navigation.getParam("chatId", uuid());
      const now = Date.now() * -1;

      delete result.cancelled;

      sendMessageRequest({
        chatId,
        sender: user.name,
        senderProfile: user.profileImage,
        timestamp: now,
        section: getYearMonthAndDay(now),
        media: result
      });

      this.toggleUploadMenuBar();
    }
  };

  handleChangeText = (text: string) => {
    this.setState(prev => ({
      ...prev,
      text
    }));
  };

  handleSendMessage = async () => {
    const { sendMessageRequest, navigation } = this.props;
    const { text, user } = this.state;

    const chatId = navigation.getParam("chatId", uuid());

    /**
     *  https://stackoverflow.com/questions/25611356/display-posts-in-descending-posted-order
     *  Unfortunately, Firebase doesn't support DESC query.
     *  Workaround for this can be using negative timestamp value.
     */
    const now = Date.now() * -1;

    sendMessageRequest({
      chatId,
      message: text,
      sender: user.name,
      senderProfile: user.profileImage,
      timestamp: now,
      section: getYearMonthAndDay(now)
    });

    // clear the message
    this.handleChangeText("");
  };

  handleRenderRow = ({ item }: { item: IMessage }) => {
    const { user } = this.state;

    if (!user) {
      return null;
    }

    return (
      <ChatBubble
        source={{
          uri: item.senderProfile
        }}
        message={item.message}
        timestamp={item.timestamp * -1}
        media={item.media}
      />
    );
  };

  handlerRenderListHeader = () => {
    // iPhoneX support
    const dimension = Dimensions.get("window");
    const isIPhoneX =
      Platform.OS === "ios" &&
      (dimension.height > 800 || dimension.width > 800);

    const styles = StyleSheet.create({
      textInputContainer: {
        padding: 8,
        backgroundColor: colors.white,
        paddingBottom: isIPhoneX ? 36 : 8,
        flexDirection: "row"
      },
      textInput: {
        borderRadius: 20,
        padding: 8,
        paddingLeft: 16,
        backgroundColor: colors.white,
        borderColor: colors.gray,
        borderWidth: 0.5,
        flex: 1,
        marginRight: 8
      },
      uploadMenuIconButton: {
        alignSelf: "flex-start",
        marginRight: 8
      }
    });

    return (
      <View style={styles.textInputContainer}>
        <TouchableOpacity
          style={styles.uploadMenuIconButton}
          onPress={this.toggleUploadMenuBar}
        >
          <MaterialCommunityIcons
            name="plus-circle-outline"
            size={32}
            color={
              this.state.uploadMenuBarVisible ? colors.primary : colors.gray
            }
          />
        </TouchableOpacity>
        <TextInput
          placeholder="메세지를 입력하세요."
          style={styles.textInput}
          onChangeText={this.handleChangeText}
          value={this.state.text}
          onSubmitEditing={this.handleSendMessage}
          enablesReturnKeyAutomatically
        />
        <TouchableOpacity
          disabled={this.state.text.length <= 0}
          onPress={this.handleSendMessage}
        >
          <MaterialCommunityIcons
            name="send"
            size={32}
            color={this.state.text.length <= 0 ? colors.gray : colors.primary}
          />
        </TouchableOpacity>
      </View>
    );
  };

  render() {
    const styles = StyleSheet.create({
      container: {
        flex: 1
      },
      timestampContainer: {
        borderRadius: 20,
        backgroundColor: colors.gray,
        marginTop: 8,
        paddingVertical: 8,
        paddingHorizontal: 16,
        alignSelf: "flex-start"
      },
      timestamp: {
        color: colors.white,
        fontSize: 16,
        textAlign: "center"
      },
      uploadMenuBarContainer: {
        borderTopColor: colors.gray,
        borderTopWidth: 0.5,
        padding: 16,
        paddingBottom: 32,
        backgroundColor: colors.white,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around"
      },
      menuContainer: {
        alignItems: "center"
      },
      menuIconContainer: {
        borderWidth: 0.5,
        borderColor: colors.gray,
        padding: 8,
        borderRadius: 10,
        marginBottom: 8
      }
    });

    const { messages } = this.state;
    const sectionedMessages = Object.entries(groupBy(messages, "section")).map(
      ([key, value]) => ({
        title: key,
        data: value
      })
    );

    /**
     * https://github.com/facebook/react-native/issues/13497
     * Android: Elements in KeyboardAvoidingView still covered by keyboard
     * use `KeyboardAvoidingView`.`keyboardVerticalOffset`
     */
    return (
      <KeyboardAvoidingView
        behavior="padding"
        style={styles.container}
        keyboardVerticalOffset={Platform.OS === "android" ? 96 : 0}
      >
        <SectionList
          inverted
          ref={ref => ((this.sectionList as any) = ref)}
          sections={sectionedMessages}
          renderSectionFooter={({ section: { title, data } }) => {
            return data.length > 0 ? (
              <View style={{ alignSelf: "center" }}>
                <View style={styles.timestampContainer}>
                  <Text style={styles.timestamp}>{title}</Text>
                </View>
              </View>
            ) : null;
          }}
          renderItem={this.handleRenderRow}
          keyExtractor={item => Number(item.timestamp).toString()}
          ListHeaderComponent={this.handlerRenderListHeader}
        />
        {this.state.uploadMenuBarVisible && (
          <View style={styles.uploadMenuBarContainer}>
            <View style={styles.menuContainer}>
              <TouchableOpacity
                style={styles.menuIconContainer}
                onPress={this.pickImage}
              >
                <MaterialCommunityIcons
                  name="image"
                  size={32}
                  color={colors.gray}
                />
              </TouchableOpacity>
              <Text>이미지</Text>
            </View>
          </View>
        )}
      </KeyboardAvoidingView>
    );
  }
}

export default connect(
  null,
  { sendMessageRequest: sendMessage.request }
)(ChatRoom);
