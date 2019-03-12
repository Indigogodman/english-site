import { WithStyles } from "@material-ui/core/styles";

export interface NavbarProps extends WithStyles {
  items: JSX.Element[];
  title: string;
}
