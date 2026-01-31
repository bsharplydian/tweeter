import { useContext } from "react";
import { UserInfoContext, UserInfoActionsContext } from "./UserInfoContexts";
import { AuthToken, User } from "tweeter-shared";

export const useUserInfoActions = () => {
  return useContext(UserInfoActionsContext);
};

export const useUserInfo = () => {
  return useContext(UserInfoContext);
};
