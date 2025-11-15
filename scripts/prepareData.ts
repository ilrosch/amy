import * as SecureStore from "expo-secure-store";

import { store } from "@/store";
import { addAuth } from "@/store/slices/auth";
import { Dispatch } from "@reduxjs/toolkit";

const prepareAuthData = async (dispatch: Dispatch) => {
  const psID = SecureStore.getItemAsync("id");
  const psToken = SecureStore.getItemAsync("token");
  const psName = SecureStore.getItemAsync("name");
  const [id, token, name] = await Promise.all([psID, psToken, psName]);
  return dispatch(addAuth({ id, token, name }));
};

const prepareData = async () => {
  const dispatch = store.dispatch;
  const authPS = prepareAuthData(dispatch);
  return Promise.all([authPS]);
};

export default prepareData;
