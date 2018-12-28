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
  SectionList,
  Keyboard,
  EmitterSubscription
} from "react-native";
import { NavigationScreenProps } from "react-navigation";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { connect } from "react-redux";
import { ImagePicker, Permissions } from "expo";
import uuid from "uuid/v4";
import { colors } from "theme";
import { sendMessage } from "store/modules/chat";
import { AppState } from "store/modules";
import { Message as IMessage } from "models/Message";
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
    uploadMenuBarVisible: false
  };

  private sectionList!: SectionList<IMessage>;
  private keyboardDidShowListener!: EmitterSubscription;

  componentDidMount = () => {
    this.keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      this.keyboardDidShow
    );
  };

  componentWillUnmount() {
    this.keyboardDidShowListener.remove();
  }

  // TODO: add animation for hiding uploadMenuBar
  toggleUploadMenuBar = () => {
    // hide Keyboard when user try to open upload menubar
    const willOpenUploadMenuBar = !this.state.uploadMenuBarVisible;

    if (willOpenUploadMenuBar) {
      Keyboard.dismiss();
    }

    this.setState(prev => ({
      ...prev,
      uploadMenuBarVisible: !prev.uploadMenuBarVisible
    }));
  };

  keyboardDidShow = () => {
    if (this.state.uploadMenuBarVisible) {
      this.toggleUploadMenuBar();
    }
  };

  askCameraRollPermission = async () => {
    // Requires Permissions.CAMERA_ROLL on iOS only.
    if (Platform.OS === "ios") {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      return status === "granted";
    }
    return true;
  };

  askCameraPermission = async () => {
    // Requires Permissions.CAMERA_ROLL and Permissions.CAMERA on iOS only.
    if (Platform.OS === "ios") {
      const [cameraRoll, camera] = await Promise.all([
        Permissions.askAsync(Permissions.CAMERA_ROLL),
        Permissions.askAsync(Permissions.CAMERA)
      ]);

      return cameraRoll.status === "granted" && camera.status === "granted";
    }
    return true;
  };

  openCamera = async () => {
    const permission = await this.askCameraPermission();

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true
    });

    if (permission && !result.cancelled) {
      console.log(result);
    }
  };

  pickImage = async () => {
    const permission = await this.askCameraRollPermission();

    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true
    });

    if (permission && !result.cancelled) {
      console.log(result);
    }
  };

  handleChangeText = (text: string) => {
    this.setState(prev => ({
      ...prev,
      text
    }));
  };

  handleSendMessage = () => {
    const { sendMessageRequest, navigation } = this.props;
    const { text } = this.state;

    const chatId = navigation.getParam("chatId", uuid());

    sendMessageRequest({
      chatId,
      message: text,
      sender: "lee",
      timestamp: Date.now()
    });

    // clear the message
    this.handleChangeText("");
  };

  handleRenderRow = ({ item }: { item: IMessage }) => {
    // TODO: add check for which user's chat
    return (
      <ChatBubble
        source={{
          uri:
            "https://m.media-amazon.com/images/M/MV5BMjM3MjM3NTAxM15BMl5BanBnXkFtZTgwMTY0Nzg2OTE@._V1_UX214_CR0,0,214,317_AL_.jpg"
        }}
        message={item.message}
        timestamp={item.timestamp}
      />
    );
  };

  render() {
    // iPhoneX support
    const dimension = Dimensions.get("window");
    const isIPhoneX =
      Platform.OS === "ios" &&
      (dimension.height > 800 || dimension.width > 800);

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
      textInputContainer: {
        padding: 8,
        backgroundColor: colors.white,
        paddingBottom: isIPhoneX ? 36 : 8,
        flexDirection: "row"
      },
      textInput: {
        borderRadius: 20,
        padding: 8,
        backgroundColor: colors.white,
        borderColor: colors.gray,
        borderWidth: 0.5,
        flex: 1,
        marginRight: 8
      },
      uploadMenuIconButton: {
        alignSelf: "center",
        marginRight: 8
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

    const { messages } = this.props;

    return (
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <SectionList
          inverted
          ref={ref => ((this.sectionList as any) = ref)}
          sections={[{ title: "2018.12.17", data: Object.values(messages) }]}
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
        />
        <View style={styles.textInputContainer}>
          <TouchableOpacity
            style={styles.uploadMenuIconButton}
            onPress={this.toggleUploadMenuBar}
          >
            <MaterialCommunityIcons
              name="plus-circle-outline"
              size={28}
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
            <View style={styles.menuContainer}>
              <TouchableOpacity
                style={styles.menuIconContainer}
                onPress={this.openCamera}
              >
                <MaterialCommunityIcons
                  name="camera"
                  size={32}
                  color={colors.gray}
                />
              </TouchableOpacity>
              <Text>카메라</Text>
            </View>
            <View style={styles.menuContainer}>
              <TouchableOpacity style={styles.menuIconContainer}>
                <MaterialCommunityIcons
                  name="video"
                  size={32}
                  color={colors.gray}
                />
              </TouchableOpacity>
              <Text>비디오</Text>
            </View>
          </View>
        )}
      </KeyboardAvoidingView>
    );
  }
}

const mapStateToProps = (state: AppState, ownProps: Props) => ({
  messages: state.chats.messages[ownProps.navigation.getParam("chatId")] || {}
});

export default connect(
  mapStateToProps,
  { sendMessageRequest: sendMessage.request }
)(ChatRoom);
