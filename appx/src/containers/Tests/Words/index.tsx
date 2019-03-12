import React, { Component } from "react";

import { createStyles, withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableHead from "@material-ui/core/TableHead";
import Grid from "@material-ui/core/Grid";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";

import Control from "./Control";
import QuestionAndAnswers from "./QuestionAndAnswers";
import PointsView from "./PointsView";

import Notification from "../../../components/Notification/index";

import config from "../../../config/index";
import WebSocket from "../../../utils/websocket";
import { ws } from "../../../constants";

import getStatistic from "./service";

import { DefaultPropsWithStyle, WordsState } from "./d";
import { connect } from "react-redux";
import { withRouter } from "react-router";

const styles = createStyles({
  root: {
    flexGrow: 1
  },
  button: {
    marginLeft: "10px"
  },
  table: {
    margin: "0 auto",
    width: "100px"
  }
});

/**
 * Тест на знание 3000 самых популярных слов в английском языке
 */
class Words extends Component<DefaultPropsWithStyle> {
  state: WordsState;

  constructor(props: DefaultPropsWithStyle) {
    super(props);
    /**
     * Сокет в локальном стейте сознательное решение, так как "по задумке" для каждого теста\игры будет свой коннектор,
     * а держать их в редакс бесмысленно, так как они должни отключаться, когда переходишь от игре к игре и хранение
     * конектора в редакс будет занимать лишнию память.
     */
    const connectorGame = new WebSocket(config.ws.WordsTest.address, {
      onClose: () =>
        this.setState({
          active: false
        }),
      onOpen: () =>
        this.state.ws
          ? this.state.ws.send({
              type: "getNextWord",
              value: "next",
              jwt: this.props.token
            })
          : {},
      onMessage: this.onMessage,
      onError: () =>
        this.setState({
          notificationMessage: ws.UnknownedError,
          notification: true
        })
    });
    this.state = {
      ws: connectorGame,
      active: false,
      question: {
        title: "",
        value: "",
        valueMayBe: []
      },
      statistic: [],
      points: 0,
      notification: false,
      notificationMessage: ""
    };
  }

  async componentDidMount(): Promise<void> {
    const statistic = await getStatistic(
      this.props.userId,
      1,
      this.props.token
    );
    this.setState({ statistic });
  }

  public run = () => {
    if (this.state.ws) this.state.ws.init();
    this.setState({
      active: true,
      points: 0
    });
  };

  public stop = () => {
    this.setState({
      active: false
    });
  };

  public reply = () => {
    this.state.ws.send({
      type: "getAnswer",
      res: {
        title: this.state.question.title,
        value: this.state.question.value
      },
      jwt: this.props.token
    });
  };

  onMessage = (message: any) => {
    let { points, ws, question } = this.state;
    switch (message.type) {
      case "question":
        const { title, valueMayBe } = message.res;
        this.setState({
          question: {
            ...question,
            title,
            valueMayBe
          }
        });
        break;
      case "res":
        if (message.res == "ok") {
          if (ws)
            ws.send({
              type: "getNextWord",
              value: "next",
              jwt: this.props.token
            });
          this.setState({ points: ++points });
        } else {
          this.setState({ points: points ? --points : 0 });
        }
        break;
      case "error":
        this.props.history.push("/login");
        break;
      default:
        break;
    }
  };

  changeAnwser = (event: React.ChangeEvent<{}>, value: string) => {
    this.setState({
      question: {
        ...this.state.question,
        value
      }
    });
  };

  closeNotification = () => {
    this.setState({ notification: false });
  };

  onEnd = (time: string) => {
    this.state.ws.send({
      type: "saveStatistic",
      res: {
        game: 1,
        points: this.state.points,
        user: this.props.userId,
        time
      },
      jwt: this.props.token
    });
    this.state.ws.close();
    getStatistic(this.props.userId, 1, this.props.token).then(data =>
      this.setState({ statistic: data })
    );
  };

  renderGame = () => {
    const {
      question,
      notification,
      notificationMessage,
      active,
      points,
      ws
    } = this.state;
    return (
      <div>
        <Notification
          open={notification}
          message={notificationMessage}
          handClose={this.closeNotification}
          type={"error"}
        />
        <PointsView points={points} active={active} onEnd={this.onEnd} />
        {active && (
          <QuestionAndAnswers
            title={question.title}
            value={question.value}
            valueMayBe={question.valueMayBe.map((value: string) => (
              <FormControlLabel
                value={value}
                control={<Radio />}
                label={value}
              />
            ))}
            handleChange={this.changeAnwser}
          />
        )}
        {ws && (
          <Control
            active={this.state.active}
            onAnswer={this.reply}
            onRun={this.run}
            onStop={this.stop}
          />
        )}
      </div>
    );
  };

  renderStatistic() {
    const { classes } = this.props;
    return (
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>Очки</TableCell>
            <TableCell align="right">Время</TableCell>
            <TableCell align="right">Дата</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {this.state.statistic.map((game: any, index: any) => (
            <TableRow key={`table-statistic-row-${index}`}>
              <TableCell component="th" scope="row">
                {game.points}
              </TableCell>
              <TableCell align="right">{game.time}</TableCell>
              <TableCell align="right">
                {new Date(game.date).toLocaleString()}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  }

  render() {
    return (
      <div>
        {this.renderGame()}
        {this.renderStatistic()}
      </div>
    );
  }
}

const mapStateToProps = (state: any) => ({
  token: state.auth.token,
  userId: state.auth.uniq,
  error: state.auth.error
});
export default withRouter(connect(mapStateToProps)(withStyles(styles)(Words)));
