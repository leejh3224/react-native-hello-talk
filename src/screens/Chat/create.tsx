import * as React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TextInput,
  FlatList,
  ImageBackground,
  TouchableOpacity,
  ImageStyle
} from "react-native";
import { NavigationScreenProps } from "react-navigation";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import users from "mocks/users.json";
import { colors } from "theme";
import { getNavigationKey } from "lib";
import { User } from "store/types/User";

interface ChatCreateState {
  selected: User[];
  keyword: string;
}

class ChatCreate extends React.Component<{}, ChatCreateState> {
  state = {
    // typescript infers elements of empty array as never
    // so we have to manually cast type[]
    selected: [] as User[],
    keyword: ""
  };

  handleSelectRow = (user: User) => {
    const { selected } = this.state;

    // filter out user if he already exists in the queue
    // otherwise push him into the queue
    const newUsers = selected.includes(user)
      ? selected.filter((item: User) => item.id !== user.id)
      : [...selected, user];

    this.setState(prev => ({
      ...prev,
      selected: newUsers
    }));
  };
  handleRenderRow = ({ item }: { item: User }) => {
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        flexDirection: "row",
        padding: 16,
        backgroundColor: colors.white,
        borderBottomColor: colors.gray,
        borderBottomWidth: 0.5
      },
      profileImage: {
        width: 60,
        height: 60,
        borderRadius: 30,
        marginRight: 16
      },
      overlay: {
        backgroundColor: `${colors.primary}80`,
        width: "100%",
        height: "100%",
        borderRadius: 30,
        justifyContent: "center",
        alignItems: "center"
      },
      contentContainer: {
        justifyContent: "center"
      },
      name: {
        fontSize: 16,
        fontWeight: "bold"
      },
      location: {
        color: colors.gray
      }
    });

    const { selected } = this.state;

    return (
      <TouchableOpacity
        style={styles.container}
        onPress={() => this.handleSelectRow(item)}
      >
        <ImageBackground
          source={{
            uri: item.profileImage
          }}
          style={styles.profileImage}
          imageStyle={{ borderRadius: 30 }}
        >
          {selected.includes(item) && (
            <View style={styles.overlay}>
              <MaterialCommunityIcons
                name="check"
                size={32}
                color={colors.white}
              />
            </View>
          )}
        </ImageBackground>
        <View style={styles.contentContainer}>
          <Text style={styles.name}>{item.name}</Text>
          <Text>
            {item.language} > {item.languageWantToLearn}
          </Text>
          <Text style={styles.location}>{item.location}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  handleChangeText = (text: string) => {
    this.setState(prev => ({
      ...prev,
      keyword: text
    }));
  };

  filterByKeyword = (items: any[]) => {
    const toMatch = ["name", "languageWantToLearn"];
    const { keyword } = this.state;

    if (!keyword) {
      return items;
    }

    return items.filter(item => {
      return toMatch.some(match =>
        item[match].toLowerCase().includes(keyword.toLowerCase())
      );
    });
  };

  render() {
    const styles = StyleSheet.create({
      container: {
        flex: 1
      },
      selectedPeopleContainer: {
        flexDirection: "row",
        padding: 16,
        backgroundColor: colors.white,
        borderBottomColor: colors.gray,
        borderBottomWidth: 0.5
      },
      input: {
        fontSize: 20,
        padding: 16,
        backgroundColor: colors.white,
        borderBottomColor: colors.gray,
        borderBottomWidth: 0.5
      },
      profileImage: {
        width: 60,
        height: 60,
        borderRadius: 30
      },
      badge: {
        width: 20,
        height: 20,
        borderRadius: 10,
        backgroundColor: colors.warning,
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
        left: 50,
        top: -5
      }
    });

    const { keyword } = this.state;

    return (
      <View style={styles.container}>
        <View style={styles.selectedPeopleContainer}>
          {this.state.selected.map((user: User) => (
            <ImageBackground
              key={user.id}
              source={{ uri: user.profileImage }}
              style={{
                ...(styles.profileImage as object),
                marginRight: 16
              }}
              imageStyle={{ borderRadius: 30 }}
            >
              <TouchableOpacity
                style={styles.badge}
                onPress={() => this.handleSelectRow(user)}
              >
                <MaterialCommunityIcons
                  name="minus"
                  size={20}
                  color={colors.white}
                />
              </TouchableOpacity>
            </ImageBackground>
          ))}
          <Image
            source={{
              uri:
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPlkwhBse_JCK37_0WA3m_PHUpFncOVLM0s0c4cCqpV27UteuJ"
            }}
            style={styles.profileImage as ImageStyle}
          />
        </View>
        <TextInput
          onChangeText={this.handleChangeText}
          value={keyword}
          placeholder="사용자이름/언어 (예: kr)"
          style={styles.input}
        />
        <FlatList<User>
          data={this.filterByKeyword(users)}
          renderItem={this.handleRenderRow}
          keyExtractor={item => item.id}
        />
      </View>
    );
  }
}

export const ChatCreateScreen = {
  screen: ChatCreate,
  navigationOptions: ({ navigation }: NavigationScreenProps) => ({
    title: "create",
    headerRight: (
      <TouchableOpacity
        onPress={() => navigation.navigate(getNavigationKey(["chat", "room"]))}
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
};

export default ChatCreate;
