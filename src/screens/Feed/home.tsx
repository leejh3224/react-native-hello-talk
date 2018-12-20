import * as React from "react";
import { View, Text } from "react-native";

class FeedHome extends React.Component {
  static navigationOptions = {
    title: "Feed"
  };

  render() {
    return (
      <View>
        <Text>Feed!</Text>
      </View>
    );
  }
}

export default FeedHome;
