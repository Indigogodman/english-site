import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/styles/withStyles";
import { createStyles, Theme } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

import { LOGIN } from "../../store/user/actions";
import { LoginPageProps, LoginPageState } from "./d";

const styles = ({ spacing, breakpoints, palette }: Theme) =>
  createStyles({
    main: {
      width: "auto",
      display: "block", // Fix IE 11 issue.
      marginLeft: spacing.unit * 3,
      marginRight: spacing.unit * 3,
      [breakpoints.up(400 + spacing.unit * 3 * 2)]: {
        width: 400,
        marginLeft: "auto",
        marginRight: "auto"
      }
    },
    paper: {
      marginTop: spacing.unit * 8,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      padding: `${spacing.unit * 2}px ${spacing.unit * 3}px ${spacing.unit *
        3}px`
    },
    avatar: {
      margin: spacing.unit,
      backgroundColor: palette.secondary.main
    },
    form: {
      width: "100%",
      marginTop: spacing.unit
    },
    submit: {
      marginTop: spacing.unit * 3
    }
  });

class LoginPage extends Component<LoginPageProps> {
  state: LoginPageState;
  constructor(props: LoginPageProps) {
    super(props);

    this.state = {
      email: "",
      password: "",
      password2: "",
      activeTab: "sign-in",
      token: this.props.token
    };
  }

  componentWillUpdate(
    nextProps: LoginPageProps,
    nextState: LoginPageState
  ): void {
    if (nextProps.token != nextState.token) {
      this.props.history.push("/");
    }
  }

  handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleTabChange = (event: React.ChangeEvent<{}>, activeTab: string) => {
    this.setState({ activeTab });
  };

  handleSingIn = (e: any) => {
    e.preventDefault();
    const { email, password } = this.state;
    this.props.dispatch(LOGIN(email, password));
  };

  render() {
    const { classes } = this.props;
    const { email, password, activeTab, password2 } = this.state;
    return (
      <div className={classes.main}>
        <Paper className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Tabs
            value={activeTab}
            indicatorColor="primary"
            textColor="primary"
            onChange={this.handleTabChange}
          >
            <Tab label="Вход" value="sign-in" />
            <Tab label="Регистрация" value="sign-up" />
          </Tabs>
          <br />
          <Typography component="h1" variant="h5">
            {activeTab === "sign-in" && "Войдите"}
            {activeTab === "sign-up" && "Зарегистрируйтесь"}
          </Typography>
          <form className={classes.form} onSubmit={this.handleSingIn}>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="email">Email Адрес</InputLabel>
              <Input
                type="email"
                id="email-1"
                name="email"
                autoFocus
                value={email}
                onChange={this.handleChange}
              />
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="password">Пароль</InputLabel>
              <Input
                name="password"
                type="password"
                id="password-1"
                value={password}
                onChange={this.handleChange}
              />
            </FormControl>
            {activeTab === "sign-up" && (
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="password2">
                  Подтверждение пароля
                </InputLabel>
                <Input
                  name="password2"
                  type="password"
                  id="password2-1"
                  value={password2}
                  onChange={this.handleChange}
                  error={password2 != password}
                />
              </FormControl>
            )}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              {activeTab === "sign-in" && "Вход"}
              {activeTab === "sign-up" && "Зарегистрироваться"}
            </Button>
          </form>
        </Paper>
      </div>
    );
  }
}
const mapStateToProps = (state: any) => ({
  token: state.auth.token,
  error: state.auth.error
});

export default withRouter(
  connect(mapStateToProps)(withStyles(styles)(LoginPage))
);
