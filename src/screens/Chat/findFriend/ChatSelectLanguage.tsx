import * as React from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { NavigationScreenProps } from "react-navigation";
import { languages } from "lib";
import { colors } from "theme";
import { Language } from "models/Language";

interface State {
  selectedLanguage: Language;
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

  handleSelect = (language: Language) => {
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

    const { selectedLanguage } = this.state;

    return (
      <View>
        <FlatList
          data={languages}
          renderItem={({ item }) => {
            return (
              <View style={styles.listItemContainer}>
                <TouchableOpacity onPress={() => this.handleSelect(item)}>
                  <Text
                    style={{
                      fontSize: 20,
                      color:
                        selectedLanguage.originalName === item.originalName
                          ? colors.black
                          : colors.gray
                    }}
                  >
                    {item.englishName}
                  </Text>
                  <Text style={styles.listItemText}>{item.originalName}</Text>
                </TouchableOpacity>
                {selectedLanguage.originalName === item.originalName && (
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
