import * as React from "react";
import {
  NavigationInjectedProps,
  HeaderBackButton,
  withNavigation
} from "react-navigation";
import { connect } from "react-redux";
import { setBottomTabBarVisibility } from "store/modules/ui";
import { getNavigationKey } from "lib";

interface Props {
  path: string[];
  showTabBar?: boolean;
  setBottomTabBarVisibility: (toggle: boolean) => void;
}

/**
 * React-Navigation withNavigation + typescript
 * use `Partial` type from typescript v2.1+
 */
const BackButton: React.SFC<Props & Partial<NavigationInjectedProps>> = ({
  navigation,
  path,
  showTabBar = false,
  ...props
}) => {
  return (
    <HeaderBackButton
      onPress={() => {
        navigation!.navigate(getNavigationKey(path));
        props.setBottomTabBarVisibility(showTabBar);
      }}
    />
  );
};

export default withNavigation(
  connect(
    null,
    { setBottomTabBarVisibility }
  )(BackButton)
);
