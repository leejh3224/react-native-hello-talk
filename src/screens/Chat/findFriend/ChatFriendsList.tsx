import * as React from "react";
import { View, Text, FlatList } from "react-native";
import { NavigationScreenProps } from "react-navigation";
import users from "mocks/users.json";

class ChatFriendsList extends React.Component<NavigationScreenProps> {
  render() {
    const { navigation } = this.props;
    const filters = navigation.getParam("filters", {});
    const filteredUsers = users.filter(user => {
      const matchesAge =
        filters.ageMin <= user.age && filters.ageMax >= user.age;
      const matchesLanguage =
        filters.language === user.language &&
        filters.languageWantToLearn === user.languageWantToLearn &&
        filters.fluency >= user.fluency;
      const matchesLocation =
        filters.country === "모든" || filters.country === user.location;

      return matchesAge && matchesLanguage && matchesLocation;
    });

    return (
      <View>
        <FlatList
          data={filteredUsers}
          renderItem={({ item }) => {
            return <Text>{item.name}</Text>;
          }}
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
