import * as React from "react";
import {
  FlatList,
  View,
  Image,
  StyleSheet,
  Text,
  ImageStyle,
  TouchableOpacity
} from "react-native";
import { NavigationScreenProps } from "react-navigation";
import { connect } from "react-redux";
import { getNavigationKey } from "lib";
import { colors } from "theme";
import { AppState } from "store/modules";
// import chats from "mocks/chats.json";
import { setBottomTabBarVisibility } from "store/modules/ui";
interface Props extends NavigationScreenProps {
  setBottomTabBarVisibility: typeof setBottomTabBarVisibility;
}

class ChatHome extends React.Component<Props, {}> {
  handleRenderRow = ({ item }) => {
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        flexDirection: "row",
        padding: 16,
        backgroundColor: colors.white
      },
      profileImage: {
        width: 60,
        height: 60,
        borderRadius: 30,
        marginRight: 16
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
        fontSize: 16,
        color: "gray"
      }
    });

    const { navigation } = this.props;

    return (
      <TouchableOpacity
        style={styles.container}
        onPress={() => {
          navigation.navigate(getNavigationKey(["chat", "room"]));
          this.props.setBottomTabBarVisibility(false);
        }}
      >
        <Image
          source={{
            uri:
              "https://www.profiletalent.com.au/wp-content/uploads/2017/05/profile-talent-ant-simpson-feature.jpg"
          }}
          style={styles.profileImage as ImageStyle}
        />
        <View style={styles.contentContainer}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.subtitle}>
            {item.lastMessage || "대화를 시작해보세요."}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  render() {
    const { chats } = this.props;

    return (
      <FlatList
        data={Object.values(chats)}
        renderItem={this.handleRenderRow}
        keyExtractor={item => item.title}
      />
    );
  }
}

const mapStateToProps = (state: AppState) => ({ chats: state.chats.chats });

export default connect(
  mapStateToProps,
  { setBottomTabBarVisibility }
)(ChatHome);
