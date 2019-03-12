import React from "react";

import Snackbar from "@material-ui/core/Snackbar";
import SnackbarContent from "@material-ui/core/SnackbarContent";

import { NotificationProps } from "./d";

const Notification = ({
  open,
  handClose,
  message,
  type,
  time = 5000
}: NotificationProps) => (
  <Snackbar
    anchorOrigin={{
      vertical: "top",
      horizontal: "right"
    }}
    open={open}
    onClose={handClose}
    autoHideDuration={time}
  >
    <SnackbarContent
      style={{ backgroundColor: type === "error" ? "#d32f2f" : "#43a047" }}
      aria-describedby="client-snackbar"
      message={<span id="client-snackbar">{message}</span>}
    />
  </Snackbar>
);
export default Notification;
