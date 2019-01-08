import * as React from "react";
import { View, StyleSheet, ViewStyle, ImageBackground } from "react-native";
import Flag from "react-native-round-flags";

interface Props {
  uri: string;
  size: number;
  country?: string;
  containerStyle?: ViewStyle;
  overlay?: React.ReactNode;
  overlayVisible?: boolean;
}

const ProfileImage: React.SFC<Props> = ({
  uri,
  size,
  country,
  overlay,
  containerStyle,
  overlayVisible
}) => {
  const styles = StyleSheet.create({
    container: {
      position: "relative",
      ...containerStyle
    },
    image: {
      width: size,
      height: size
    },
    flag: {
      position: "absolute",
      bottom: 0,
      left: 0,
      width: size * 0.4,
      height: size * 0.4
    }
  });

  return (
    <View style={styles.container}>
      <ImageBackground
        source={{ uri }}
        style={styles.image}
        imageStyle={{ borderRadius: size / 2 }}
      >
        {overlayVisible && overlay}
      </ImageBackground>
      {country && <Flag code={country} style={styles.flag} />}
    </View>
  );
};

export default ProfileImage;
