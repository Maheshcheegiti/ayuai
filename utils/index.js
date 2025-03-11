import SuperTokens from "supertokens-react-native";

const getUserID = async () => {
  if (await SuperTokens.doesSessionExist()) {
    let userId = await SuperTokens.getUserId();
    return userId;
  }
};

const getUserIDforEdamam = async () => {
  if (await SuperTokens.doesSessionExist()) {
    let userId = await SuperTokens.getUserId();
    const reverseUserId = userId.split("").reverse().join("");
    const truncatedUserId = reverseUserId.slice(0, 30);
    const reversedTruncatedUserId = truncatedUserId
      .split("")
      .reverse()
      .join("");
    return reversedTruncatedUserId;
  }
};

export { getUserID, getUserIDforEdamam };
