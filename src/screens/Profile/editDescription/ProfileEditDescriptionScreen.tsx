import * as React from "react";
import { Image } from "react-native";
import { globalHeaderConfig } from "lib";
import ProfileEditDescription from "./ProfileEditDescription";
import { colors } from "theme";

const ProfileEditDescriptionScreen = {
  screen: ProfileEditDescription,
  navigationOptions: {
    headerStyle: {
      ...globalHeaderConfig,
      backgroundColor: colors.white
    },
    headerBackground: null
  }
};

export default ProfileEditDescriptionScreen;
