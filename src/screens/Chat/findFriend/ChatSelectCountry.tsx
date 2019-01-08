import * as React from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Dimensions
} from "react-native";
import Flag from "react-native-round-flags";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { NavigationScreenProps, Header } from "react-navigation";
import { countries } from "lib";
import { colors } from "theme";

interface State {
  selectedCountry: string;
}

class ChatSelectCountry extends React.Component<NavigationScreenProps, State> {
  constructor(props: NavigationScreenProps) {
    super(props);
    this.state = {
      selectedCountry: props.navigation.getParam("selectedCountry", "모든")
    };
  }

  handleSelect = (country: string) => {
    const { navigation } = this.props;

    navigation.goBack();
    navigation.getParam("onSelect", () => {})("country", country);
  };

  // TODO: Orientation 변화에 따라서 글자의 maxWidth를 변화시켜야 함.
  // use onLayout event (https://facebook.github.io/react-native/docs/view#onlayout)
  render() {
    const ROW_HEIGHT = 80;

    const styles = StyleSheet.create({
      listItemContainer: {
        padding: 16,
        flexDirection: "row",
        backgroundColor: colors.white,
        alignItems: "center",
        justifyContent: "space-between",
        height: ROW_HEIGHT
      },
      listItemTitle: {
        fontSize: 20,
        maxWidth: Dimensions.get("window").width - 100
      },
      listItemFlag: {
        width: 30,
        height: 30,
        marginRight: 16
      }
    });

    const { selectedCountry } = this.state;

    const { height: windowHeight } = Dimensions.get("window");

    const initialRows = Math.floor((windowHeight - Header.HEIGHT) / ROW_HEIGHT);
    const itemIndex = countries.findIndex(
      country => country.code === selectedCountry
    );

    return (
      <View>
        <FlatList
          data={countries}
          ListHeaderComponent={() => {
            return (
              <TouchableOpacity
                style={styles.listItemContainer}
                onPress={() => this.handleSelect("모든")}
              >
                <Text style={styles.listItemTitle}>모든</Text>
                {selectedCountry === "모든" && (
                  <MaterialCommunityIcons
                    name="check"
                    size={28}
                    color={colors.primary}
                  />
                )}
              </TouchableOpacity>
            );
          }}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity
                style={styles.listItemContainer}
                onPress={() => this.handleSelect(item.code)}
              >
                <View
                  style={{
                    flexDirection: "row"
                  }}
                >
                  <Flag code={item.code} style={styles.listItemFlag} />
                  <Text
                    style={styles.listItemTitle}
                    numberOfLines={2}
                    ellipsizeMode="tail"
                  >
                    {item.name}
                  </Text>
                </View>
                {selectedCountry === item.code && (
                  <MaterialCommunityIcons
                    name="check"
                    size={28}
                    color={colors.primary}
                  />
                )}
              </TouchableOpacity>
            );
          }}
          keyExtractor={item => item.code}
          initialScrollIndex={
            // if selected item's position is over half the initial rows
            // we scroll down a few to "center" our item on the screen
            itemIndex > Math.floor(initialRows / 2)
              ? itemIndex - Math.floor(initialRows / 2) + 1 // # of ListHeader
              : 0
          }
          getItemLayout={(_, index) => {
            return {
              length: ROW_HEIGHT,
              offset: ROW_HEIGHT * index,
              index
            };
          }}
          initialNumToRender={initialRows}
        />
      </View>
    );
  }
}

export default ChatSelectCountry;
