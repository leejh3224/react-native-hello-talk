import * as React from "react";
import { View, TextInput, Text, StyleSheet } from "react-native";
import * as firebase from "firebase";
import { NavigationScreenProps } from "react-navigation";
import { colors } from "theme";

class EditDescription extends React.Component<NavigationScreenProps> {
  constructor(props) {
    super(props);

    this.state = {
      text: "",
      user: null
    };
  }

  componentDidMount = async () => {
    const user = firebase.auth().currentUser;

    if (user) {
      const firebaseUser = (await firebase
        .database()
        .ref(`users/${user.uid}`)
        .once("value")).val();

      const { navigation } = this.props;

      navigation.setParams({
        originalDescription: firebaseUser.description,
        editedDescription: firebaseUser.description
      });

      this.setState(prev => ({
        ...prev,
        user: firebaseUser,
        text: firebaseUser.description
      }));
    }
  };

  handleReset = () => {
    this.setState(prev => ({
      ...prev,
      text: ""
    }));
  };

  handleChangeText = (text: string) => {
    const { navigation } = this.props;

    this.setState(prev => ({
      ...prev,
      text
    }));

    navigation.setParams({ editedDescription: text });
  };

  render() {
    const styles = StyleSheet.create({
      container: {
        backgroundColor: colors.white,
        padding: 16,
        marginTop: 16
      },
      titleContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 16
      },
      description: {
        color: colors.gray,
        fontSize: 14
      },
      textInput: {
        fontSize: 20,
        fontWeight: "bold",
        borderBottomWidth: 2,
        borderBottomColor: colors.primary
      }
    });

    const { text } = this.state;
    const DESCRIPTION_MAX_LENGTH = 1000;

    return (
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.description}>자기 소개</Text>
          <Text style={styles.description}>{`${DESCRIPTION_MAX_LENGTH -
            text.length}/${DESCRIPTION_MAX_LENGTH}`}</Text>
        </View>
        <TextInput
          value={text}
          onChangeText={this.handleChangeText}
          style={styles.textInput}
        />
      </View>
    );
  }
}

export default EditDescription;
