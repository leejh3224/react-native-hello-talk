import * as React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Slider,
  ScrollView
} from "react-native";
import { NavigationScreenProps } from "react-navigation";
import { Formik, FormikProps } from "formik";
import { colors } from "theme";
import { getNavigationKey } from "lib";
import FormSection from "./FormSection";
import NumberPickerModal from "./NumberPickerModal";

interface State {
  ageMin: number;
  ageMax: number;
  modalVisible: {
    age: boolean;
    [key: string]: boolean;
  };
}

interface FormValues {
  ageMin: number;
  ageMax: number;
  country: string;
  language: string;
  languageWantToLearn: string;
  fluency: number;
}

class ChatFindFriend extends React.Component<NavigationScreenProps, State> {
  state = {
    ageMin: 18,
    ageMax: 90,
    modalVisible: {
      age: false
    }
  };

  onSubmit = (values: FormValues) => {
    const { navigation } = this.props;

    navigation.navigate(getNavigationKey(["chat", "friendsList"]), {
      filters: {
        ...values,
        query: navigation.getParam("findFriendKeyword", "")
      }
    });
  };

  onPickerValueChange = (name: string, value: number) => {
    this.setState(prev => ({
      ...prev,
      [name]: value
    }));
  };

  onPressSection = (name: string, params: any) => {
    const { navigation } = this.props;

    navigation.navigate(getNavigationKey(["chat", name]), params);
  };

  toggleModal = (name: string, callback?: any) => {
    if (callback) {
      callback();
    }

    this.setState(prev => ({
      ...prev,
      modalVisible: {
        ...prev.modalVisible,
        [name]: !prev.modalVisible[name]
      }
    }));
  };

  render() {
    const { modalVisible, ageMin, ageMax } = this.state;

    const styles = StyleSheet.create({
      sliderSectionContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        marginBottom: 32
      },
      sliderContainer: {
        alignItems: "center",
        width: "100%",
        marginBottom: 16
      },
      slider: {
        width: "100%"
      },
      sliderLabelContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%"
      },
      buttonsContainer: { padding: 16, backgroundColor: colors.white },
      buttonText: { color: colors.white, fontSize: 20 },
      searchButton: {
        backgroundColor: colors.primary,
        padding: 16,
        alignItems: "center",
        borderRadius: 3,
        marginTop: 32,
        marginBottom: 16
      },
      resetButton: {
        backgroundColor: `${colors.primary}80`,
        padding: 16,
        alignItems: "center",
        borderRadius: 3,
        marginBottom: 32
      }
    });

    /**
     * Picker Component resets when items list changes
     * It happens when Picker.Item changes. Doesn't have a solution now
     * https://github.com/facebook/react-native/issues/13351
     */
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
        {({
          handleReset,
          values,
          setFieldValue,
          handleSubmit
        }: FormikProps<FormValues>) => (
          <ScrollView>
            <View style={{ marginBottom: 16 }}>
              <FormSection
                onPress={() => this.toggleModal("age")}
                name="나이"
                value={`${values.ageMin}-${values.ageMax}`}
              />

              <FormSection
                onPress={() =>
                  this.onPressSection("selectCountry", {
                    selectedCountry: values.country,
                    onSelect: setFieldValue
                  })
                }
                name="지역"
                value={values.country}
              />
            </View>

            <FormSection
              onPress={() =>
                this.onPressSection("selectLanguage", {
                  pageTitle: "모국어",
                  onSelect: setFieldValue,
                  selectedLanguage: values.language
                })
              }
              name="모국어"
              value={values.language}
            />

            <View
              style={{
                backgroundColor: colors.white,
                padding: 24,
                borderBottomColor: colors.gray,
                borderBottomWidth: 0.5
              }}
            >
              <FormSection
                onPress={() =>
                  this.onPressSection("selectLanguage", {
                    pageTitle: "학습 언어",
                    onSelect: setFieldValue,
                    selectedLanguageWantToLearn: values.languageWantToLearn
                  })
                }
                name="학습 언어"
                value={values.languageWantToLearn}
                containerStyle={styles.sliderSectionContainer}
              />
              <View style={styles.sliderContainer}>
                <Slider
                  minimumValue={0}
                  maximumValue={4}
                  value={values.fluency}
                  step={1}
                  minimumTrackTintColor={colors.primary}
                  maximumTrackTintColor={colors.gray}
                  onValueChange={value => setFieldValue("fluency", value)}
                  style={styles.slider}
                />
              </View>
              <View style={styles.sliderLabelContainer}>
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

            <View style={styles.buttonsContainer}>
              {/* react native events are incompatible with html form events */}
              <TouchableOpacity
                style={styles.searchButton}
                onPress={handleSubmit as any}
              >
                <Text style={styles.buttonText}>검색</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.resetButton}
                onPress={handleReset}
              >
                <Text style={styles.buttonText}>재설정</Text>
              </TouchableOpacity>
            </View>

            <NumberPickerModal
              visible={modalVisible.age}
              ageMin={ageMin}
              ageMax={ageMax}
              onPickerValueChange={this.onPickerValueChange}
              onClose={() => {
                this.toggleModal("age", () => {
                  setFieldValue("ageMin", ageMin);
                  setFieldValue("ageMax", ageMax);
                });
              }}
            />
          </ScrollView>
        )}
      </Formik>
    );
  }
}

export default ChatFindFriend;
