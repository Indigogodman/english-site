import { WithStyles } from "@material-ui/core";

import { RouteComponentProps } from "react-router";

export interface LoginPageProps extends WithStyles, RouteComponentProps {
  dispatch: (e: any) => void;
  token: string;
}

export interface LoginPageState {
  email: string;
  password: string;
  password2: string;
  activeTab: string;
  token: string;
}
