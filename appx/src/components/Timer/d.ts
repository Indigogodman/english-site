export interface TimerProps {
  active: boolean;
  onEnd?: (time: string) => void;
}

export interface TimerState {
  interval: number | undefined;
  minute: number;
  second: number;
}
