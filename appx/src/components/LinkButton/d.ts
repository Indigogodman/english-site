import { ButtonProps } from "@material-ui/core/Button";

export interface LinkButtonProps extends ButtonProps {
  to: string;
  replace?: boolean;
  params?: any;
}
