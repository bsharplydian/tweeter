import { useContext } from "react";
import { UserInfoContext } from "./UserInfoContexts";

interface UsernameAuthActions {}

export const useUsernameAuth = () => {
  const { currentUser, displayedUser, authToken } = useContext(UserInfoContext);
  return {};
};
