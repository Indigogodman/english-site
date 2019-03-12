import { WebSocketLogs, WebSocketEvents } from "./websocket.d";
/**
 * Класс для взаимодействия по веб-сокету, с логированием.
 */
class CustomWebSocket {
  private ws: WebSocket | null = null;
  private address: string;
  private active: boolean = false;
  private _logs: WebSocketLogs[] = [];
  constructor(address: string, option: WebSocketEvents) {
    this.address = address;
    this._onOpen = option.onOpen;
    this._onClose = option.onClose;
    this._onMessage = option.onMessage;
  }

  public init = () => {
    this.ws = new WebSocket(this.address);
    this.ws.onmessage = this.onMessage;
    this.ws.onopen = this.onOpen;
    this.ws.onclose = this.onClose;
    this.ws.onerror = this.onError;
  };

  public close = () => {
    if (this.ws) this.ws.close();
  };

  private onOpen = () => {
    this.active = true;
    this.logs.push({ type: "log", message: "Connect open" });
    this._onOpen();
  };

  private onClose = (event: CloseEvent) => {
    this.active = false;
    this.logs.push({ type: "log", message: "Connect close" });
    this._onClose(event);
  };
  private onError = (event: Event) => {
    this.logs.push({ type: "log", message: "error" });
    this._onClose(event);
  };

  private onMessage = (event: MessageEvent) => {
    const message = JSON.parse(event.data);
    this.logs.push({ type: "log", message: event.data });
    this._onMessage(message);
  };

  private _onOpen() {}
  private _onClose(event: Event) {}
  private _onMessage(message: any) {}

  get logs() {
    return this._logs;
  }

  public send = (message: any) => {
    if (this.ws && this.active) this.ws.send(JSON.stringify(message));
  };
}

export default CustomWebSocket;
