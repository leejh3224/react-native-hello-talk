import * as React from "react";
import { Text, StyleSheet, View, TextStyle } from "react-native";
import * as firebase from "firebase";
import { ScaleBar, ProfileImage } from "components";
import { colors } from "theme";

interface Me {
  profileImage: string;
  country: string;
  name: string;
  language: string;
  languageWantToLearn: string;
  fluency: number;
}

class ProfileBox extends React.Component<{}, { user: Me | null }> {
  state = {
    user: null
  };

  componentDidMount = async () => {
    const user = firebase.auth().currentUser;

    if (user) {
      const firebaseUser = (await firebase
        .database()
        .ref(`users/${user.uid}`)
        .once("value")).val();

      this.setState(prev => ({
        ...prev,
        user: firebaseUser
      }));
    }
  };

  render() {
    const styles = StyleSheet.create({
      profileTitle: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 8,
        textAlign: "center"
      },
      profileDescription: {
        fontSize: 14,
        color: colors.gray
      },
      scaleBarContainer: {
        flexDirection: "row",
        justifyContent: "center",
        marginBottom: 8
      },
      scaleBar: {
        width: 40,
        height: 5,
        backgroundColor: colors.gray,
        borderRadius: 5
      }
    });

    const { user } = this.state;

    if (!user) {
      return null;
    }

    const {
      profileImage,
      country,
      name,
      language,
      languageWantToLearn,
      fluency
    } = user;

    // mother tongue
    const MAX_FLUENCY = 4;

    return (
      <>
        <ProfileImage
          uri={profileImage}
          size={120}
          country={country}
          containerStyle={{
            marginBottom: 16
          }}
        />
        <Text style={styles.profileTitle as TextStyle} numberOfLines={2}>
          {name}
        </Text>
        <View style={styles.scaleBarContainer}>
          <ScaleBar
            label={language}
            scale={MAX_FLUENCY}
            barColor={colors.primary}
          />
          <Text style={{ marginHorizontal: 8 }}>></Text>
          <ScaleBar
            label={languageWantToLearn}
            scale={fluency}
            barColor={colors.secondary}
          />
        </View>
      </>
    );
  }
}

export default ProfileBox;
