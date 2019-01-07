import * as React from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import * as firebase from "firebase";
import { colors } from "theme";
import { ProfileImage } from "components";
import { getHoursAndMinutes } from "lib";

interface Props {
  source: {
    uri: string;
  };
  message?: string;
  timestamp: number;
  media?: object;
}

class ChatBubble extends React.PureComponent<Props> {
  render() {
    const { source, message, timestamp, media } = this.props;

    const user = firebase.auth().currentUser;
    const isMine = user.photoURL === source.uri;

    const styles = StyleSheet.create({
      container: {
        flexDirection: isMine ? "row" : "row-reverse",
        alignItems: "center",
        marginVertical: 8,
        alignSelf: isMine ? "flex-start" : "flex-end"
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
        marginRight: isMine ? 0 : 8,
        alignSelf: "flex-end",
        color: colors.gray
      }
    });

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
        {message ? (
          <View style={styles.messageContainer}>
            <Text style={styles.message}>{message}</Text>
          </View>
        ) : (
          <Image
            source={{ uri: media && media.uri }}
            style={{
              width: media && media.width / 4,
              height: media && media.height / 4
            }}
          />
        )}
        <Text style={styles.timestamp}>{getHoursAndMinutes(timestamp)}</Text>
      </View>
    );
  }
}

export default ChatBubble;
