import { call, put, takeLatest, all } from "redux-saga/effects";
import {
  AUTH_REQUEST,
  AUTH_SUCCESS,
  AUTH_FAILURE,
  AUTH_LOGOUT_REQUEST,
  AUTH_LOGOUT_FAILURE,
  AUTH_LOGOUT_SUCCESS
} from "./actions";

import fetchJSON from "../../utils/fetchJSON";
import config from "../../config";

function* LOGOUT() {
  yield takeLatest(AUTH_LOGOUT_REQUEST, logout);
}

function* logout() {
  try {
    yield put({ type: AUTH_LOGOUT_SUCCESS });
  } catch (error) {
    yield put({ type: AUTH_LOGOUT_FAILURE, payload: error.message });
  }
}
async function* login({ payload: { email, password } }: any) {
  try {
    const { jwt, username, uniq } = yield await call(
      fetchJSON,
      `${config.api.auth.address}/login`,
      {
        body: JSON.stringify({ email, password }),
        method: "POST",
        headers: { "Content-Type": "application/json" }
      }
    );
    yield put({ type: AUTH_SUCCESS, payload: { jwt, email: username, uniq } });

    localStorage.setItem("token", jwt);
    localStorage.setItem("email", username);
    localStorage.setItem("id_username", uniq);
  } catch (error) {
    let message;
    switch (error.status) {
      case 500:
        message = "Internal Server Error";
        break;
      case 401:
        message = "Invalid credentials";
        break;
      default:
        message = "Something went wrong";
    }
    yield put({ type: AUTH_FAILURE, payload: message });
    localStorage.removeItem("token");
  }
}

function* AUTH() {
  yield takeLatest(AUTH_REQUEST, login);
}

export default function* rootSaga() {
  yield all([AUTH(), LOGOUT()]);
}
