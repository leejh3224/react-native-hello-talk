import { withPrefix } from "store/utils";
import { createStandardAction, ActionType, getType } from "typesafe-actions";

export const setBottomTabBarVisibility = createStandardAction(
  withPrefix("SET_BOTTOM_TAB_BAR_VISIBILITY")
)<boolean>();

export type UIActions = ActionType<typeof setBottomTabBarVisibility>;

const initialState = {
  bottomTabBarVisible: true
};

export const reducer = (state = initialState, action: UIActions) => {
  switch (action.type) {
    case getType(setBottomTabBarVisibility):
      return {
        ...state,
        bottomTabBarVisible: action.payload
      };
    default:
      return state;
  }
};
