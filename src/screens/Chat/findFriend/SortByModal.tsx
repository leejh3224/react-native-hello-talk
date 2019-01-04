import * as React from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { BaseModal } from "components";

interface State {
  isVisible: boolean;
}

class SortByModal extends React.Component<{}, State> {
  state = {
    isVisible: false
  };

  toggleModal = () => {
    this.setState(prev => ({
      ...prev,
      isVisible: !prev.isVisible
    }));
  };

  render() {
    const styles = StyleSheet.create({
      titleContainer: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center"
      },
      title: {
        fontSize: 24,
        marginTop: 8,
        marginBottom: 16
      },
      description: {
        fontSize: 20
      }
    });

    const { isVisible } = this.state;
    const filters = ["기본", "온라인", "가장 가까운"];

    return (
      <TouchableOpacity
        style={styles.titleContainer}
        onPress={this.toggleModal}
      >
        <Text style={styles.title}>검색 결과</Text>
        <MaterialCommunityIcons name="chevron-down" size={28} />
        <BaseModal visible={isVisible} onClose={this.toggleModal}>
          <Text style={styles.title}>정렬</Text>
          {filters.map(item => (
            <TouchableWithoutFeedback key={item}>
              <View style={{ paddingVertical: 16 }}>
                <Text style={styles.description}>{item}</Text>
              </View>
            </TouchableWithoutFeedback>
          ))}
        </BaseModal>
      </TouchableOpacity>
    );
  }
}

export default SortByModal;
