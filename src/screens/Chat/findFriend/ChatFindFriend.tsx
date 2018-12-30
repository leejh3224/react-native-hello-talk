import * as React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Picker,
  StyleSheet,
  Slider,
  ScrollView,
  Dimensions
} from "react-native";
import { NavigationScreenProps } from "react-navigation";
import { Formik } from "formik";
import Modal from "react-native-modal";
import range from "lodash.range";
import { colors } from "theme";
import { getNavigationKey } from "lib";

interface State {
  modalVisible: {
    age: boolean;
    [key: string]: boolean;
  };
}

class ChatFindFriend extends React.Component<NavigationScreenProps, State> {
  state = {
    modalVisible: {
      age: false
    }
  };

  onSubmit = values => {
    console.log(values);
  };

  toggleModal = (name: string) => {
    this.setState(prev => ({
      ...prev,
      modalVisible: {
        ...prev.modalVisible,
        [name]: !prev.modalVisible[name]
      }
    }));
  };

  render() {
    const { modalVisible } = this.state;
    const { navigation } = this.props;

    const styles = StyleSheet.create({
      sectionContainer: {
        backgroundColor: colors.white,
        flexDirection: "row",
        padding: 24,
        alignItems: "center",
        justifyContent: "space-between",
        borderBottomColor: colors.gray,
        borderBottomWidth: 0.5
      },
      sectionTitle: {
        fontSize: 20
      },
      sectionDescription: {
        fontSize: 16,
        color: colors.gray,
        maxWidth: Dimensions.get("window").width / 2 - 32
      }
    });

    return (
      <Formik
        initialValues={{
          ageMin: 18,
          ageMax: 90,
          country: "모든",
          language: "English",
          languageWantToLearn: "English",
          fluency: 4
        }}
        onSubmit={this.onSubmit}
      >
        {({ handleReset, values, setFieldValue }) => (
          <ScrollView>
            <TouchableOpacity
              style={styles.sectionContainer}
              onPress={() => this.toggleModal("age")}
            >
              <Text style={styles.sectionTitle}>나이</Text>
              <Text
                style={styles.sectionDescription}
                numberOfLines={1}
                ellipsizeMode="tail"
              >{`${values.ageMin}-${values.ageMax}`}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                ...(styles.sectionContainer as object),
                marginBottom: 16,
                borderBottomWidth: 0
              }}
              onPress={() => {
                navigation.navigate(
                  getNavigationKey(["chat", "selectCountry"]),
                  {
                    selectedCountry: values.country,
                    onSelect: setFieldValue
                  }
                );
              }}
            >
              <Text style={styles.sectionTitle}>지역</Text>
              <Text
                style={styles.sectionDescription}
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {values.country}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.sectionContainer}
              onPress={() => {
                navigation.navigate(
                  getNavigationKey(["chat", "selectLanguage"]),
                  {
                    pageTitle: "모국어",
                    onSelect: setFieldValue,
                    selectedLanguage: values.language
                  }
                );
              }}
            >
              <Text style={styles.sectionTitle}>모국어</Text>
              <Text
                style={styles.sectionDescription}
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {values.language}
              </Text>
            </TouchableOpacity>

            <View
              style={{
                ...(styles.sectionContainer as object),
                flexDirection: "column"
              }}
            >
              <TouchableOpacity
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: "100%",
                  marginBottom: 32
                }}
                onPress={() => {
                  navigation.navigate(
                    getNavigationKey(["chat", "selectLanguage"]),
                    {
                      pageTitle: "학습 언어",
                      onSelect: setFieldValue,
                      selectedLanguageWantToLearn: values.languageWantToLearn
                    }
                  );
                }}
              >
                <Text style={styles.sectionTitle}>학습 언어</Text>
                <Text
                  style={styles.sectionDescription}
                  numberOfLines={1}
                  ellipsizeMode="tail"
                >
                  {values.languageWantToLearn}
                </Text>
              </TouchableOpacity>
              <View
                style={{
                  alignItems: "center",
                  width: "100%",
                  marginBottom: 16
                }}
              >
                <Slider
                  minimumValue={0}
                  maximumValue={4}
                  value={values.fluency}
                  step={1}
                  minimumTrackTintColor={colors.primary}
                  maximumTrackTintColor={colors.gray}
                  onValueChange={value => setFieldValue("fluency", value)}
                  style={{
                    width: "100%"
                  }}
                />
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  width: "100%"
                }}
              >
                {["초보", "기초", "중급", "고급", "능숙"].map(
                  (level, index) => (
                    <Text
                      key={level}
                      style={{
                        fontSize: 18,
                        color:
                          index <= values.fluency
                            ? colors.primary
                            : colors.black
                      }}
                    >
                      {level}
                    </Text>
                  )
                )}
              </View>
            </View>

            <View style={{ padding: 16, backgroundColor: colors.white }}>
              <TouchableOpacity
                style={{
                  backgroundColor: colors.primary,
                  padding: 16,
                  alignItems: "center",
                  borderRadius: 3,
                  marginTop: 32,
                  marginBottom: 16
                }}
              >
                <Text style={{ color: colors.white, fontSize: 20 }}>검색</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  backgroundColor: `${colors.primary}80`,
                  padding: 16,
                  alignItems: "center",
                  borderRadius: 3,
                  marginBottom: 32
                }}
                onPress={handleReset}
              >
                <Text style={{ color: colors.white, fontSize: 20 }}>
                  재설정
                </Text>
              </TouchableOpacity>
            </View>

            <Modal
              isVisible={modalVisible.age}
              animationIn="fadeIn"
              animationOut="fadeOut"
              animationInTiming={150}
              animationOutTiming={150}
              backdropTransitionInTiming={150}
              backdropTransitionOutTiming={150}
            >
              <View
                style={{
                  backgroundColor: colors.white,
                  marginHorizontal: 16,
                  padding: 24,
                  borderRadius: 5,
                  // shadow
                  shadowColor: colors.black,
                  shadowOffset: {
                    width: 0,
                    height: 3
                  },
                  shadowOpacity: 0.27,
                  shadowRadius: 4.65,
                  elevation: 6
                }}
              >
                <Text style={{ fontSize: 20 }}>나이 범위</Text>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "flex-start",
                    height: 200
                  }}
                >
                  <Picker
                    selectedValue={values.ageMin}
                    style={{ width: "50%", height: 50 }}
                    onValueChange={value => setFieldValue("ageMin", value)}
                  >
                    {range(18, 91).map(age => (
                      <Picker.Item
                        key={age}
                        label={age.toString()}
                        value={age}
                      />
                    ))}
                  </Picker>
                  <Picker
                    selectedValue={values.ageMax}
                    style={{ width: "50%", height: 50 }}
                    onValueChange={value => setFieldValue("ageMax", value)}
                  >
                    {range(18, 91).map(age => (
                      <Picker.Item
                        key={age}
                        label={age.toString()}
                        value={age}
                      />
                    ))}
                  </Picker>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    alignSelf: "flex-end",
                    alignItems: "center",
                    width: 150,
                    justifyContent: "space-around"
                  }}
                >
                  <TouchableOpacity onPress={() => this.toggleModal("age")}>
                    <Text style={{ fontSize: 18, color: colors.primary }}>
                      취소
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => this.toggleModal("age")}>
                    <Text
                      style={{
                        fontSize: 18,
                        fontWeight: "bold",
                        color: colors.primary
                      }}
                    >
                      OK
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>
          </ScrollView>
        )}
      </Formik>
    );
  }
}

export default ChatFindFriend;
