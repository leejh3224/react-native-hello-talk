import * as React from "react";
import { Text, StyleSheet, View, TextStyle } from "react-native";
import { connect } from "react-redux";
import { ScaleBar, ProfileImage } from "components";
import { colors } from "theme";
import { AppState } from "store/modules";

interface Me {
  profileImage: string;
  country: string;
  name: string;
  language: string;
  languageWantToLearn: string;
  fluency: number;
}

interface Props {
  me: Me;
}

const ProfileBox: React.SFC<Props> = ({ me }) => {
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

  if (!me) {
    return null;
  }

  const {
    profileImage,
    country,
    name,
    language,
    languageWantToLearn,
    fluency
  } = me;

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
};

const mapStateToProps = (state: AppState) => ({
  me: state.auth.me
});

export default connect(
  mapStateToProps,
  null
)(ProfileBox);
