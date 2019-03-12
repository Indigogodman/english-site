export const AUTH_REQUEST = "AUTH_REQUEST";
export const AUTH_SUCCESS = "AUTH_SUCCESS";
export const AUTH_FAILURE = "AUTH_FAILURE";
export const AUTH_LOGOUT_REQUEST = "AUTH_LOGOUT_REQUEST";
export const AUTH_LOGOUT_SUCCESS = "AUTH_LOGOUT_SUCCESS";
export const AUTH_LOGOUT_FAILURE = "AUTH_LOGOUT_FAILURE";

export const LOGIN = (email: any, password: any) => ({
  type: AUTH_REQUEST,
  payload: { email, password }
});

export const LOGOUT = () => ({
  type: AUTH_LOGOUT_REQUEST
});
