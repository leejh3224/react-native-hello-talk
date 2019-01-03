import * as React from "react";
import { StyleSheet, View, Text } from "react-native";
import { colors } from "theme";
import { ProfileImage } from "components";
import { getHoursAndMinutes } from "lib";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 8,
    alignSelf: "flex-start"
  },
  messageContainer: {
    maxWidth: 220,
    backgroundColor: colors.white,
    borderRadius: 20,
    alignSelf: "flex-start",
    paddingVertical: 8,
    paddingHorizontal: 16
  },
  message: {
    fontSize: 18,
    lineHeight: 24
  },
  timestamp: {
    marginLeft: 8,
    alignSelf: "flex-end",
    color: colors.gray
  }
});

interface Props {
  source: {
    uri: string;
  };
  message: string;
  timestamp: number;
}

class ChatBubble extends React.PureComponent<Props> {
  render() {
    const { source, message, timestamp } = this.props;
    return (
      <View style={styles.container}>
        <ProfileImage
          uri={source.uri}
          size={40}
          containerStyle={{
            marginHorizontal: 16,
            alignSelf: "flex-start"
          }}
        />
        <View style={styles.messageContainer}>
          <Text style={styles.message}>{message}</Text>
        </View>
        <Text style={styles.timestamp}>{getHoursAndMinutes(timestamp)}</Text>
      </View>
    );
  }
}

export default ChatBubble;
