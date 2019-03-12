import { Link } from "react-router-dom";
import React from "react";
import Button from "@material-ui/core/Button";

import { LinkButtonProps } from "./d";

const LinkButton = (props: LinkButtonProps) => (
  <Button {...props} component={Link as any} />
);

export default LinkButton;
