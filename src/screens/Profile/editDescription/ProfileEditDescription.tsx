import * as React from "react";
import { View, TextInput, Text, StyleSheet } from "react-native";
import { colors } from "theme";

class EditDescription extends React.Component {
  state = {
    keyword: ""
  };

  handleChangeText = (text: string) => {
    this.setState(prev => ({
      ...prev,
      keyword: text
    }));
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

    const { keyword } = this.state;

    return (
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.description}>자기 소개</Text>
          <Text style={styles.description}>{`${1000 -
            keyword.length}/1000`}</Text>
        </View>
        <TextInput
          value={keyword}
          onChangeText={this.handleChangeText}
          style={styles.textInput}
        />
      </View>
    );
  }
}

export default EditDescription;
