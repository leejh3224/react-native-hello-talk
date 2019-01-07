import * as React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { NavigationScreenProps } from "react-navigation";
import { ProfileImage, ScaleBar } from "components";
// import users from "mocks/users.json";
import { User } from "models/User";
import { languages } from "lib";
import { colors } from "theme";

class ChatFriendsList extends React.Component<NavigationScreenProps> {
  handleRenderRow = ({ item }: { item: User }) => {
    const styles = StyleSheet.create({
      container: {
        flexDirection: "row",
        backgroundColor: colors.white
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

    return (
      <View style={styles.container}>
        <ProfileImage
          uri={item.profileImage}
          size={70}
          country={item.country}
          containerStyle={{
            margin: 16
          }}
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
      </View>
    );
  };

  render() {
    const { navigation } = this.props;
    const filters = navigation.getParam("filters", {});
    const filteredUsers: User[] = [].filter(user => {
      const matchesAge =
        filters.ageMin <= user.age && filters.ageMax >= user.age;
      const matchesLanguage =
        filters.language.originalName === user.language &&
        filters.languageWantToLearn.originalName === user.languageWantToLearn &&
        filters.fluency >= user.fluency;
      const matchesLocation =
        filters.country === "모든" || filters.country === user.country;
      const matchesQuery = filters.query
        ? filters.query.toLowerCase().includes(user.name.toLowerCase()) ||
          filters.query.toLowerCase().includes(user.language.toLowerCase())
        : true;

      return matchesQuery && matchesAge && matchesLanguage && matchesLocation;
    });

    return (
      <View>
        <FlatList<User>
          data={filteredUsers}
          renderItem={this.handleRenderRow}
          keyExtractor={item => item.id}
          ListEmptyComponent={() => {
            return <Text>검색 결과가 없습니다.</Text>;
          }}
        />
      </View>
    );
  }
}

export default ChatFriendsList;
