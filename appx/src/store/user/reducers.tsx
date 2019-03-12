import {
  AUTH_FAILURE,
  AUTH_SUCCESS,
  AUTH_LOGOUT_FAILURE,
  AUTH_LOGOUT_SUCCESS
} from "./actions";

const initialState = {
  token: localStorage.getItem("token"),
  email: localStorage.getItem("email"),
  uniq: localStorage.getItem("id_username"),
  error: null
};

export default (state = initialState, { type, payload }: any) => {
  switch (type) {
    case AUTH_SUCCESS: {
      return {
        ...state,
        token: payload.jwt,
        email: payload.email,
        uniq: payload.uniq
      };
    }
    case AUTH_LOGOUT_FAILURE:
    case AUTH_FAILURE: {
      return { ...state, error: payload };
    }
    case AUTH_LOGOUT_SUCCESS: {
      return { token: null, email: null, error: null, uniq: null };
    }
    default:
      return state;
  }
};
