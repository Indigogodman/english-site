import { WithStyles } from "@material-ui/core";
import React from "react";

import CustomWebSocket from "../../../utils/websocket";
import { RouteComponentProps } from "react-router";

interface FunctionClick {
  (event: React.MouseEvent<HTMLElement>): void;
}

interface Question {
  title: string;
  value: string;
  valueMayBe: string[];
}

export interface QuestionAndAnswersProps extends WithStyles {
  title: string;
  value: string;
  handleChange: (event: React.ChangeEvent<{}>, value: string) => void;
  valueMayBe: JSX.Element[];
}

export interface PointsViewProps {
  active: boolean;
  points: number;
  onEnd: (time: string) => void;
}

export interface WordsState {
  ws: CustomWebSocket;
  active: boolean;
  question: Question;
  points: number;
  notification: boolean;
  notificationMessage: string;
  statistic: any;
}

export interface DefaultPropsWithStyle extends WithStyles, RouteComponentProps {
  dispatch: (e: any) => void;
  token: string;
  userId: string;
}

export interface ControlProps extends WithStyles {
  active: boolean;
  onAnswer: FunctionClick;
  onStop: FunctionClick;
  onRun: FunctionClick;
}
