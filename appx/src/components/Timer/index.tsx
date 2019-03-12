import React, { Component } from "react";
import { TimerProps, TimerState } from "./d";

/**
 * Компонент таймер в виде минуты:секунды
 * @typedef {Object} TimerProps
 * @property {boolean} active Определяет, работает таймер или нет
 */
class Timer extends Component<TimerProps> {
  state: TimerState;
  constructor(props: TimerProps) {
    super(props);
    this.state = {
      interval: undefined,
      minute: 0,
      second: 0
    };
  }

  componentDidUpdate(prevProps: TimerProps, prevState: TimerState): void {
    if (prevProps.active && !prevState.interval) {
      prevState.interval = window.setInterval(this.secondHandler, 1000);
      prevState.minute = 0;
      prevState.second = 0;
    } else if (!prevProps.active && prevState.interval) {
      clearInterval(prevState.interval);
      if (this.props.onEnd)
        this.props.onEnd(`${this.state.minute}:${this.state.second}`);
      delete prevState.interval;
    }
  }

  secondHandler = () => {
    let { second, minute } = this.state;
    ++second;
    if (second > 59) {
      this.setState({
        minute: minute + 1,
        second: 0
      });
    } else {
      this.setState({
        minute,
        second
      });
    }
  };

  render() {
    const { minute, second } = this.state;
    return (
      <span>
        {minute}:{second}
      </span>
    );
  }
}

export default Timer;
