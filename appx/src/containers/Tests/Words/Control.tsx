import React from "react";

import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";

import { createStyles, withStyles, WithStyles } from "@material-ui/core";

import { ControlProps } from "./d";

const styles = createStyles({
  root: {
    flexGrow: 1
  },
  button: {
    marginLeft: "10px"
  }
});

/**
 * Отображает кнопки взаимодействия с тестом
 * @param {WithStyles<typeof styles>} classes
 * @param {boolean} active
 * @param {FunctionClick} onAnswer
 * @param {FunctionClick} onRun
 * @param {FunctionClick} onStop
 * @returns {Component}
 * @constructor
 */
const Control = ({
  classes,
  active,
  onAnswer,
  onRun,
  onStop
}: ControlProps) => (
  <Grid
    container
    className={classes.root}
    direction="row"
    justify="center"
    alignItems="center"
  >
    {!active && (
      <Button variant="contained" className={classes.button} onClick={onRun}>
        Старт
      </Button>
    )}
    {active && (
      <Button
        variant="contained"
        className={classes.button}
        color="primary"
        onClick={onAnswer}
      >
        Отправить
      </Button>
    )}
    {active && (
      <Button variant="contained" className={classes.button} onClick={onStop}>
        Стоп
      </Button>
    )}
  </Grid>
);

export default withStyles(styles)(Control);
