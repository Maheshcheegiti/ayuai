import SuperTokens from "supertokens-react-native";

const getUserID = async () => {
  if (await SuperTokens.doesSessionExist()) {
    let userId = await SuperTokens.getUserId();
    return userId;
  }
};


export { getUserID };
