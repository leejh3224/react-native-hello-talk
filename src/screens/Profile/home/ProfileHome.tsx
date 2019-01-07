import * as React from "react";
import {
  ScrollView,
  TouchableOpacity,
  Text,
  StyleSheet,
  TextStyle
} from "react-native";
import * as firebase from "firebase";
import { connect } from "react-redux";
import { colors } from "theme";
import { getNavigationKey } from "lib";
import { NavigationScreenProps } from "react-navigation";
import { setBottomTabBarVisibility } from "store/modules/ui";

class ProfileHome extends React.Component<NavigationScreenProps> {
  state = {
    user: null
  };

  componentDidMount = async () => {
    const user = firebase.auth().currentUser;

    if (user) {
      const userRef = firebase.database().ref(`users/${user.uid}`);

      userRef.on("value", snap => {
        if (snap.exists()) {
          this.setState(prev => ({
            ...prev,
            user: snap.val()
          }));
        }
      });
    }
  };

  componentWillUnmount = () => {
    const user = firebase.auth().currentUser;

    if (user) {
      const userRef = firebase.database().ref(`users/${user.uid}`);
      userRef.off("value");
    }
  };

  logout = async () => {
    try {
      const { navigation } = this.props;

      await firebase.auth().signOut();

      const isLoggedOut = !firebase.auth().currentUser;

      if (isLoggedOut) {
        // redirect to login page
        navigation.navigate(getNavigationKey(["auth", "login"]));
      }
    } catch (error) {
      // TODO: add toast logout failure message
      console.log(error);
    }
  };

  render() {
    const styles = StyleSheet.create({
      container: {
        marginBottom: 16,
        backgroundColor: colors.white,
        padding: 16
      },
      title: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 16
      },
      description: {
        color: colors.darkGray,
        fontSize: 18
      },
      actionText: {
        color: colors.warning,
        fontSize: 20
      }
    });

    const { navigation } = this.props;
    const { user } = this.state;

    if (!user) {
      return null;
    }

    return (
      <ScrollView
        style={{
          /**
           * positioning hack:
           * As `profile` has absolute position,
           * we need to manually add marginTop
           */
          marginTop: 144
        }}
      >
        <TouchableOpacity
          style={styles.container}
          onPress={() => {
            navigation.navigate(
              getNavigationKey(["profile", "editDescription"])
            );
            this.props.setBottomTabBarVisibility(false);
          }}
        >
          <Text style={styles.title as TextStyle}>자기 소개</Text>
          <Text style={styles.description}>{user.description}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.container, { alignItems: "center" }]}
          onPress={this.logout}
        >
          <Text style={styles.actionText}>로그아웃</Text>
        </TouchableOpacity>
      </ScrollView>
    );
  }
}

export default connect(
  null,
  { setBottomTabBarVisibility }
)(ProfileHome);
