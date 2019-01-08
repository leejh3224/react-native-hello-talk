import * as React from "react";
import {
  FlatList,
  View,
  StyleSheet,
  Text,
  TouchableOpacity
} from "react-native";
import { NavigationScreenProps } from "react-navigation";
import * as firebase from "firebase";
import { connect } from "react-redux";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { getNavigationKey, getHoursAndMinutes } from "lib";
import { colors } from "theme";
import { AppState } from "store/modules";
import { setBottomTabBarVisibility } from "store/modules/ui";
import { Chat } from "models/Chat";
import { ProfileImage, BaseModal } from "components";

interface Props extends NavigationScreenProps {
  setBottomTabBarVisibility: typeof setBottomTabBarVisibility;
  chats: {
    [key: string]: Chat;
  };
}

class ChatHome extends React.Component<Props, {}> {
  state = {
    modalVisible: false,
    selectedChatId: ""
  };

  deleteChat = () => {
    const { selectedChatId: chatId } = this.state;

    if (chatId) {
      return Promise.all([
        firebase
          .database()
          .ref(`chats/${chatId}`)
          .remove(),
        firebase
          .database()
          .ref(`members/${chatId}`)
          .remove(),
        firebase
          .database()
          .ref(`messages/${chatId}`)
          .remove()
      ]).then(() => this.toggleModal());
    }

    return;
  };

  toggleModal = () => {
    this.setState(prev => ({
      ...prev,
      modalVisible: !prev.modalVisible
    }));
  };

  onLongPressItem = (chatId: string) => {
    this.setState(
      prev => ({
        ...prev,
        selectedChatId: chatId
      }),
      this.toggleModal
    );
  };

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
    const chatId = Object.keys(chats)[index];

    return (
      <TouchableOpacity
        style={styles.container}
        onPress={() => {
          navigation.navigate(getNavigationKey(["chat", "room"]), {
            chatId
          });
          this.props.setBottomTabBarVisibility(false);
        }}
        onLongPress={() => this.onLongPressItem(chatId)}
      >
        <ProfileImage
          uri={item.image}
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
    const { modalVisible } = this.state;

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

        <BaseModal visible={modalVisible} onClose={this.toggleModal}>
          <View>
            <Text
              style={{
                fontSize: 20,
                textAlign: "center",
                marginVertical: 16
              }}
            >
              대화를 삭제하시겠습니까?
            </Text>
            <View
              style={{
                alignSelf: "flex-end",
                flexDirection: "row",
                alignItems: "flex-end"
              }}
            >
              <TouchableOpacity
                style={{ marginRight: 16 }}
                onPress={this.deleteChat}
              >
                <Text
                  style={{
                    fontSize: 22,
                    color: colors.warning,
                    fontWeight: "bold"
                  }}
                >
                  OK
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={this.toggleModal}>
                <Text
                  style={{
                    fontSize: 20,
                    color: colors.black,
                    fontWeight: "bold"
                  }}
                >
                  취소
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </BaseModal>
      </View>
    );
  }
}

const mapStateToProps = (state: AppState) => ({ chats: state.chats.chats });

export default connect(
  mapStateToProps,
  { setBottomTabBarVisibility }
)(ChatHome);
