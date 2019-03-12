import React from "react";

export interface NotificationProps {
  open: boolean;
  handClose: (event?: React.SyntheticEvent<HTMLElement>) => void;
  message: string;
  type?: string;
  time?: number;
}
