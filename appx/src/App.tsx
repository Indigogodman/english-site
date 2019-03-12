import React, { Component } from "react";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";

import Navbar from "./components/Navbar";
import Words from "./containers/Tests/Words";
import LinkButton from "./components/LinkButton";
import Index from "./containers/Index";
import LoginPage from "./containers/User/LoginPage";
import { LOGOUT } from "./store/user/actions";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import { connect } from "react-redux";

export interface Props {
  dispatch: (e: any) => void;
  username: string;
}

class App extends Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      anchorEl: null,
      anchorEl2: null
    };
  }
  handleClick = (event: React.MouseEvent) => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };
  handleClick2 = (event: React.MouseEvent) => {
    this.setState({ anchorEl2: event.currentTarget });
  };

  handleClose2 = () => {
    this.setState({ anchorEl2: null });
    this.props.dispatch(LOGOUT());
  };
  handleClose3 = () => {
    this.setState({ anchorEl2: null });
  };
  render() {
    const { anchorEl, anchorEl2 } = this.state;
    const isAuth = !!this.props.username;
    return (
      <Router>
        <div>
          <Navbar
            title={"Langvini"}
            items={[
              isAuth ? (
                <div key={"navbar-item-1"}>
                  <Button
                    aria-owns={anchorEl2 ? "simple-menu" : undefined}
                    aria-haspopup="true"
                    onClick={this.handleClick2}
                  >
                    {this.props.username}
                  </Button>
                  {anchorEl2 && (
                    <Menu
                      id="simple-menu"
                      anchorEl={anchorEl2}
                      open={Boolean(anchorEl2)}
                      onClose={this.handleClose3}
                    >
                      <Button onClick={this.handleClose2}>Выйти</Button>
                    </Menu>
                  )}
                </div>
              ) : (
                <LinkButton key={"navbar-item-1"} to="/login">
                  Войти
                </LinkButton>
              ),
              <div key={"navbar-item-2"}>
                <Button
                  aria-owns={anchorEl ? "simple-menu" : undefined}
                  aria-haspopup="true"
                  onClick={this.handleClick}
                >
                  Тесты
                </Button>
                {anchorEl && (
                  <Menu
                    id="simple-menu"
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={this.handleClose}
                  >
                    <LinkButton onClick={this.handleClose} to="/words">
                      Тест на слова
                    </LinkButton>
                  </Menu>
                )}
              </div>
            ]}
          />
          <div className="App">
            <Route path="/" exact component={Index} />
            <Route path="/login" component={LoginPage} />
            <Route
              path="/words/"
              render={() => (!isAuth ? <Redirect to="/login" /> : <Words />)}
            />
          </div>
        </div>
      </Router>
    );
  }
}

const mapStateToProps = (state: any) => ({
  username: state.auth.email
});

export default connect(mapStateToProps)(App);
