import axiosInstance from "@/lib/clients/axios";
import routers from "@/lib/routes";
import isValidName from "../utils/validateUserName";
import saveUserData from "../utils/saveUserData";

export type UserData = {
  id: string;
  name: string;
  token: string;
};

export type CreateAccountType = (value: string) => Promise<UserData>;

const createAccount: CreateAccountType = async (value) => {
  if (!isValidName(value)) {
    throw "ERR_VALID_NAME";
  }

  try {
    const reqData = { name: value };
    const res = await axiosInstance.post(routers["create-account"](), reqData);
    const userData = { ...reqData, ...res.data };
    await saveUserData(userData);
    return userData;
  } catch (err) {
    throw err.code;
  }
};

export default createAccount;
