import { useContext } from "react";
import { UserInfoContext, UserInfoActionsContext } from "./UserInfoContexts";
import { AuthToken, User } from "tweeter-shared";

interface UserInfoActions {
  updateUserInfo: (
    currentUser: User,
    displayedUser: User | null,
    authToken: AuthToken,
    remember: boolean,
  ) => void;
  clearUserInfo: () => void;
  setDisplayedUser: (user: User) => void;
}

export const useUserInfoActions = (): UserInfoActions => {
  const { updateUserInfo, clearUserInfo, setDisplayedUser } = useContext(
    UserInfoActionsContext,
  );
  return {
    updateUserInfo: (
      currentUser: User,
      displayedUser: User | null,
      authToken: AuthToken,
      remember: boolean,
    ) => updateUserInfo(currentUser, displayedUser, authToken, remember),
    clearUserInfo: clearUserInfo,
    setDisplayedUser: setDisplayedUser,
  };
};

export const useUserInfo = () => {
  return useContext(UserInfoContext);
};
