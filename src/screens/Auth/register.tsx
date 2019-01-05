import * as React from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableWithoutFeedback,
  TouchableOpacity,
  DatePickerIOS,
  FlatList,
  ScrollView
} from "react-native";
import { Localization } from 'expo-localization';
import { MaterialCommunityIcons, Entypo } from "@expo/vector-icons";
import { Formik, FormikProps } from "formik";
import * as firebase from "firebase";
import { BackButton, BaseModal } from "components";
import { globalHeaderConfig, getYearMonthAndDay, languages } from "lib";
import { colors } from "theme";
import { NavigationScreenProps } from "react-navigation";

interface FormValues {
  name: string;
  birthday: Date;
  language: string;
  languageWantToLearn: string;
  gender: "male" | "female";
  fluency: number;
  [key: string]: string | number | Date;
}

const SectionIcon = ({ name, color }) => {
  const iconMap: any = {
    name: "account-outline",
    birthday: "cake-layered",
    language: "language",
    languageWantToLearn: "language"
  };

  const IconComponent =
    name === "language" || name === "languageWantToLearn"
      ? Entypo
      : MaterialCommunityIcons;

  return (
    <IconComponent
      name={iconMap[name]}
      color={color}
      size={32}
      style={{ marginRight: 16 }}
    />
  );
};

class AuthRegister extends React.Component<NavigationScreenProps> {
  state = {
    textInputFocused: false,
    modalVisible: {
      birthday: false,
      language: false,
      languageWantToLearn: false
    }
  };

  onTextInputFocus = () => {
    this.setState(prev => ({
      ...prev,
      textInputFocused: true
    }));
  };

  onTextInputBlur = () => {
    this.setState(prev => ({
      ...prev,
      textInputFocused: false
    }));
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

  onSubmit = async (values: FormValues) => {
    try {
      const { navigation } = this.props;

      const user = navigation.getParam("userData");

      values.age = new Date().getFullYear() - values.birthday.getFullYear();
      delete values.birthday;

      if (user) {
        await firebase
          .database()
          .ref(`users/${user.uid}`)
          .set({
            ...values,
            description: "",
            profileImage: user.photoURL,
            lastActiveTime: 0,
            country: Localization.country
          });
      }
    } catch (error) {
      console.log(error);
    }
  };

  getDisplayValue = (values: any, title: string) => {
    if (typeof values[title] === "string") {
      return values[title];
    } else {
      if (
        Math.abs(values.birthday.getFullYear() - new Date().getFullYear()) < 17
      ) {
        return "";
      }

      return getYearMonthAndDay(values[title].getTime());
    }
  };

  getDisplayColor = (values: any, title: string) => {
    if (typeof values[title] === "string") {
      if (values[title].length > 0) {
        return colors.primary;
      }

      return colors.gray;
    } else {
      if (
        Math.abs(values.birthday.getFullYear() - new Date().getFullYear()) < 17
      ) {
        return colors.gray;
      }

      return colors.primary;
    }
  };

  render() {
    const { textInputFocused } = this.state;

    const styles = StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: colors.white,
        paddingHorizontal: 32,
        paddingVertical: 16
      },
      sectionContainer: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 8,
        borderBottomWidth: 2,
        borderBottomColor: colors.gray
      },
      sectionText: {
        fontSize: 18
      },
      genderSectionContainer: {
        paddingVertical: 32,
        paddingHorizontal: 60,
        flexDirection: "row",
        justifyContent: "space-around"
      },
      genderSectionOption: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: colors.lightGray,
        alignItems: "center",
        justifyContent: "center"
      },
      submitButton: {
        padding: 16,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: colors.primary,
        borderRadius: 3
      },
      actionButton: {
        alignSelf: "flex-end"
      },
      actionText: {
        fontSize: 18,
        fontWeight: "bold",
        color: colors.primary
      }
    });

    const { modalVisible } = this.state;
    const initialFormValues: FormValues = {
      name: "",
      birthday: new Date(),
      language: "",
      languageWantToLearn: "",
      gender: "male",
      fluency: 3
    };

    return (
      <Formik initialValues={initialFormValues} onSubmit={this.onSubmit}>
        {({ values, handleChange, setFieldValue }: FormikProps<FormValues>) => {
          const submitButtonEnabled = Object.keys(initialFormValues)
            .filter(key => !["gender", "fluency"].includes(key))
            .every(key => values[key] !== initialFormValues[key]);

          return (
            <ScrollView style={styles.container}>
              {["name", "birthday", "language", "languageWantToLearn"].map(
                title => {
                  return (
                    <TouchableWithoutFeedback
                      key={title}
                      onPress={() => this.toggleModal(title)}
                    >
                      <View
                        style={{
                          ...(styles.sectionContainer as object),
                          borderBottomColor:
                            textInputFocused && title === "name"
                              ? colors.primary
                              : colors.gray
                        }}
                      >
                        <SectionIcon
                          name={title}
                          color={this.getDisplayColor(values, title)}
                        />
                        <TextInput
                          placeholder={
                            ({
                              name: "이름",
                              birthday: "생일",
                              language: "모국어",
                              languageWantToLearn: "학습 언어"
                            } as any)[title]
                          }
                          value={this.getDisplayValue(values, title)}
                          onChangeText={handleChange(title)}
                          onFocus={this.onTextInputFocus}
                          onBlur={this.onTextInputBlur}
                          editable={title === "name"}
                          style={styles.sectionText}
                        />
                      </View>
                    </TouchableWithoutFeedback>
                  );
                }
              )}
              {/* ADD Fluency Slider */}
              <View style={styles.genderSectionContainer}>
                {["male", "female"].map(gender => {
                  const selected = values.gender === gender;

                  return (
                    <TouchableWithoutFeedback
                      key={gender}
                      onPress={() => setFieldValue("gender", gender)}
                    >
                      <View
                        style={{
                          ...(styles.genderSectionOption as object),
                          backgroundColor: selected
                            ? gender === "male"
                              ? colors.primary
                              : colors.warning
                            : colors.gray
                        }}
                      >
                        <MaterialCommunityIcons
                          name={`human-${gender}`}
                          color={colors.white}
                          size={40}
                        />
                      </View>
                    </TouchableWithoutFeedback>
                  );
                })}
              </View>
              <TouchableOpacity
                style={{
                  ...(styles.submitButton as object),
                  opacity: submitButtonEnabled ? 1 : 0.3
                }}
                disabled={!submitButtonEnabled}
              >
                <Text style={{ fontSize: 20, color: colors.white }}>완료</Text>
              </TouchableOpacity>

              <BaseModal
                visible={modalVisible.birthday}
                onClose={() => this.toggleModal("birthday")}
              >
                <Text
                  style={{
                    fontSize: 24,
                    marginBottom: 16
                  }}
                >
                  생일
                </Text>
                <DatePickerIOS
                  date={values.birthday}
                  onDateChange={newDate => setFieldValue("birthday", newDate)}
                  mode="date"
                  minimumDate={(() => {
                    const day = new Date(new Date().getFullYear(), 11, 31);
                    const minYear = day.getFullYear() - 90;
                    day.setFullYear(minYear);
                    return day;
                  })()}
                  maximumDate={(() => {
                    const day = new Date(new Date().getFullYear(), 11, 31);
                    const maxYear = day.getFullYear() - 18;
                    day.setFullYear(maxYear);
                    return day;
                  })()}
                />
                <TouchableOpacity
                  onPress={() => this.toggleModal("birthday")}
                  style={styles.actionButton}
                >
                  <Text style={styles.actionText}>OK</Text>
                </TouchableOpacity>
              </BaseModal>

              {["language", "languageWantToLearn"].map(title => {
                return (
                  <BaseModal
                    key={title}
                    visible={modalVisible[title]}
                    onClose={() => this.toggleModal(title)}
                  >
                    <Text
                      style={{
                        fontSize: 24,
                        marginBottom: 16
                      }}
                    >
                      {
                        ({
                          language: "모국어",
                          languageWantToLearn: "학습 언어"
                        } as any)[title]
                      }
                    </Text>
                    <View style={{ maxHeight: 327 }}>
                      <FlatList
                        data={languages}
                        renderItem={({ item }) => {
                          return (
                            <TouchableOpacity
                              onPress={() => {
                                setFieldValue(title, item.originalName);
                                this.toggleModal(title);
                              }}
                              style={{
                                paddingVertical: 8
                              }}
                            >
                              {[item.englishName, item.originalName].map(
                                (name, index) => (
                                  <Text
                                    key={`${name}-${index}`}
                                    style={{
                                      color:
                                        values[title] === item.originalName
                                          ? colors.primary
                                          : colors.black
                                    }}
                                  >
                                    {name}
                                  </Text>
                                )
                              )}
                            </TouchableOpacity>
                          );
                        }}
                        keyExtractor={item => item.originalName}
                      />
                    </View>
                  </BaseModal>
                );
              })}
            </ScrollView>
          );
        }}
      </Formik>
    );
  }
}

export const AuthRegisterScreen = {
  screen: AuthRegister,
  navigationOptions: () => {
    const styles = StyleSheet.create({
      titleContainer: {
        flex: 1,
        alignItems: "flex-start"
      },
      title: {
        fontSize: 24,
        fontWeight: "bold"
      }
    });

    return {
      headerLeft: <BackButton path={["auth", "login"]} showTabBar />,
      headerTitle: (
        <View style={styles.titleContainer}>
          <Text style={styles.title}>가입</Text>
        </View>
      ),
      headerStyle: {
        ...globalHeaderConfig,
        // no-bottom-shadow
        shadowColor: "transparent",
        elevation: 0,
        borderBottomWidth: 0
      }
    };
  }
};

export default AuthRegister;
