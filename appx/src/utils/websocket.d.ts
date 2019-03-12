export interface WebSocketLogs {
  type: string;
  message: string;
}

export interface FunctionEvent {
  (event: Event | MessageEvent | JSON): void;
}

export interface Function {
  (): void;
}

export interface WebSocketEvents {
  onMessage: FunctionEvent;
  onOpen: Function;
  onClose: FunctionEvent;
  onError: FunctionEvent;
}
