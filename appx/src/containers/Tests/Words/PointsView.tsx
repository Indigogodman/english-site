import React from "react";

import Typography from "@material-ui/core/Typography";

import Timer from "../../../components/Timer/index";

import { PointsViewProps } from "./d";

/**
 * Отображает кнопки взаимодействия с тестом
 * @param {boolean} active
 * @param {number} point Количество очков
 * @returns {Component}
 * @constructor
 */
const PointsView = ({ points, active, onEnd }: PointsViewProps) => (
  <Typography
    component="h2"
    variant="h2"
    gutterBottom
    style={{ textAlign: "center" }}
  >
    {points} очков за <Timer active={active} onEnd={onEnd} />
  </Typography>
);

export default PointsView;
