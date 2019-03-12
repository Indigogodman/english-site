import React from "react";

import RadioGroup from "@material-ui/core/RadioGroup";
import FormLabel from "@material-ui/core/FormLabel";
import FormControl from "@material-ui/core/FormControl";
import Grid from "@material-ui/core/Grid";

import { createStyles, withStyles, WithStyles } from "@material-ui/core";

import { QuestionAndAnswersProps } from "./d";

const styles = createStyles({
  root: {
    flexGrow: 1
  },
  button: {
    marginLeft: "10px"
  },
  formControl: {
    textAlign: "center"
  }
});

/**
 * Отображает слово и выбор правильного значения этого слова
 * @param {WithStyles<typeof styles>} classes
 * @param {JSX.Element[]} valueMayBe
 * @param {Props.handleChange} handleChange
 * @param {string} value
 * @param {string} title
 * @returns {Component}
 * @constructor
 */
const QuestionAndAnswers = ({
  classes,
  valueMayBe,
  handleChange,
  value,
  title
}: QuestionAndAnswersProps) => (
  <Grid
    container
    className={classes.root}
    direction="row"
    justify="center"
    alignItems="center"
  >
    <FormControl className={classes.formControl}>
      <FormLabel>{title}</FormLabel>
      <RadioGroup
        aria-label="Answer"
        name="answer"
        value={value}
        onChange={handleChange}
      >
        {valueMayBe}
      </RadioGroup>
    </FormControl>
  </Grid>
);

export default withStyles(styles)(QuestionAndAnswers);
