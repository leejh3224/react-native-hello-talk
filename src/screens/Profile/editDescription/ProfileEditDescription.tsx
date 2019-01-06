import * as React from "react";
import { View, TextInput, Text, StyleSheet } from "react-native";
import { connect } from "react-redux";
import { colors } from "theme";
import { AppState } from "store/modules";
import { NavigationScreenProps } from "react-navigation";

class EditDescription extends React.Component<NavigationScreenProps> {
  constructor(props) {
    super(props);
    const { me, navigation } = props;

    navigation.setParams({
      originalDescription: me.description,
      editedDescription: me.description
    });

    this.state = {
      text: me.description
    };
  }

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

const mapStateToProps = (state: AppState) => ({
  me: state.auth.me
});

export default connect(
  mapStateToProps,
  null
)(EditDescription);
