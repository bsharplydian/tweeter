import { useNavigate } from "react-router-dom";
import { AuthToken, FakeData, User } from "tweeter-shared";
import { useUserInfo, useUserInfoActions } from "../userInfo/UserInfoHooks";
import { useMessageActions } from "../toaster/MessageHooks";

export const useUserNavigation = (): ((
  event: React.MouseEvent,
) => Promise<void>) => {
  const navigate = useNavigate();
  const { displayedUser, authToken } = useUserInfo();
  const { setDisplayedUser } = useUserInfoActions();
  const { displayErrorMessage } = useMessageActions();
  const navigateToUser = async (event: React.MouseEvent): Promise<void> => {
    event.preventDefault();

    try {
      const alias = extractAlias(event.target.toString());

      const toUser = await getUser(authToken!, alias);
      const featurePath = extractFeaturePath(event.target.toString());

      if (toUser) {
        if (!toUser.equals(displayedUser!)) {
          setDisplayedUser(toUser);
          navigate(`${featurePath}/${toUser.alias}`);
        }
      }
    } catch (error) {
      displayErrorMessage(`Failed to get user because of exception: ${error}`);
    }
  };

  const extractAlias = (value: string): string => {
    const index = value.indexOf("@");
    return value.substring(index);
  };

  const extractFeaturePath = (value: string): string => {
    console.log(value);
    const regexFinder = /\/followees|\/followers|\/feed|\/story/.exec(value);
    console.log(regexFinder);
    const index = regexFinder?.index;
    if (index == undefined) {
      return "/feed";
    } else {
      return regexFinder![0];
    }
  };

  const getUser = async (
    authToken: AuthToken,
    alias: string,
  ): Promise<User | null> => {
    // TODO: Replace with the result of calling server
    return FakeData.instance.findUserByAlias(alias);
  };

  return navigateToUser;
};
