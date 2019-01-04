import * as React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TextInput,
  FlatList,
  TouchableOpacity,
  ImageStyle
} from "react-native";
import { NavigationScreenProps } from "react-navigation";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import users from "mocks/users.json";
import { colors } from "theme";
import { User } from "models/User";
import { ProfileImage, ScaleBar } from "components";
import { languages } from "lib";

interface ChatCreateState {
  selected: User[];
  keyword: string;
}

class ChatCreate extends React.Component<
  NavigationScreenProps,
  ChatCreateState
> {
  state = {
    // typescript infers elements of empty array as never
    // so we have to manually cast type[]
    selected: [] as User[],
    keyword: ""
  };

  handleSelectRow = (user: User) => {
    const { selected } = this.state;
    const { navigation } = this.props;

    // filter out user if he already exists in the queue
    // otherwise push him into the queue
    const newUsers = selected.includes(user)
      ? selected.filter((item: User) => item.id !== user.id)
      : [...selected, user];

    this.setState(prev => ({
      ...prev,
      selected: newUsers
    }));

    // pass selected user to header: ok button
    navigation.setParams({ selected: newUsers });
  };
  handleRenderRow = ({ item }: { item: User }) => {
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        flexDirection: "row",
        backgroundColor: colors.white
      },
      overlay: {
        backgroundColor: `${colors.primary}80`,
        width: "100%",
        height: "100%",
        borderRadius: 35,
        justifyContent: "center",
        alignItems: "center"
      },
      contentContainer: {
        flex: 1,
        flexDirection: "row",
        borderBottomColor: colors.gray,
        borderBottomWidth: 0.5,
        alignItems: "center",
        justifyContent: "space-between",
        paddingRight: 16
      },
      title: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 4
      },
      description: {
        color: colors.gray
      }
    });

    const { selected } = this.state;

    return (
      <TouchableOpacity
        style={styles.container}
        onPress={() => this.handleSelectRow(item)}
      >
        <ProfileImage
          uri={item.profileImage}
          size={70}
          country={item.country}
          containerStyle={{
            margin: 16
          }}
          overlay={
            selected.includes(item) && (
              <View style={styles.overlay}>
                <MaterialCommunityIcons
                  name="check"
                  size={32}
                  color={colors.white}
                />
              </View>
            )
          }
        />
        <View style={styles.contentContainer}>
          <View>
            <Text style={styles.title}>{item.name}</Text>
            <View
              style={{
                flexDirection: "row",
                marginBottom: 4
              }}
            >
              <ScaleBar
                label={
                  languages.find(el => el.originalName === item.language)!.code
                }
                scale={item.fluency}
                barColor={colors.secondary}
              />
              <Text style={{ marginHorizontal: 8 }}>></Text>
              <ScaleBar
                label={
                  languages.find(
                    el => el.originalName === item.languageWantToLearn
                  )!.code
                }
                scale={item.fluency}
                barColor={colors.primary}
              />
            </View>
            <Text style={styles.description}>위치 정보 없음</Text>
          </View>
          <Text style={styles.description}>15 시간 전</Text>
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
        item[match].toLowerCase().startsWith(keyword.toLowerCase())
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
            <ProfileImage
              key={user.id}
              uri={user.profileImage}
              size={60}
              country={user.country}
              containerStyle={{
                marginRight: 16
              }}
              overlay={
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
              }
            />
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
        {/* TODO: fix manually filtered self */}
        <FlatList<User>
          data={this.filterByKeyword(
            users.filter(item => item.id !== "101669882281461678010")
          )}
          renderItem={this.handleRenderRow}
          keyExtractor={item => item.id}
        />
      </View>
    );
  }
}

export default ChatCreate;
