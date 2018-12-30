import * as React from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity
} from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { NavigationScreenProps } from "react-navigation";
import { languages } from "lib";
import { colors } from "theme";

interface State {
  selectedLanguage: string;
}

class ChatSelectLanguage extends React.Component<NavigationScreenProps, State> {
  constructor(props: NavigationScreenProps) {
    super(props);
    this.state = {
      selectedLanguage:
        props.navigation.getParam("selectedLanguage") ||
        props.navigation.getParam("selectedLanguageWantToLearn")
    };
  }

  handleSelect = (language: string) => {
    const { navigation } = this.props;

    navigation.goBack();

    const fieldName = navigation.getParam("selectedLanguage")
      ? "language"
      : "languageWantToLearn";

    navigation.getParam("onSelect", () => {})(fieldName, language);
  };

  render() {
    const styles = StyleSheet.create({
      listItemContainer: {
        padding: 16,
        flexDirection: "row",
        backgroundColor: colors.white,
        alignItems: "center",
        justifyContent: "space-between"
      },
      listItemText: {
        color: colors.gray,
        fontSize: 20
      }
    });

    return (
      <View>
        <FlatList
          data={languages}
          renderItem={({ item }) => {
            return (
              <View style={styles.listItemContainer}>
                <TouchableOpacity
                  onPress={() => this.handleSelect(item.originalName)}
                >
                  <Text
                    style={{
                      fontSize: 20,
                      color:
                        this.state.selectedLanguage === item.originalName
                          ? colors.black
                          : colors.gray
                    }}
                  >
                    {item.englishName}
                  </Text>
                  <Text style={styles.listItemText}>{item.originalName}</Text>
                </TouchableOpacity>
                {this.state.selectedLanguage === item.originalName && (
                  <MaterialCommunityIcons
                    name="check"
                    size={28}
                    color={colors.primary}
                  />
                )}
              </View>
            );
          }}
          keyExtractor={item => item.englishName}
        />
      </View>
    );
  }
}

export default ChatSelectLanguage;
