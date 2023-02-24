import { WebsocketConnectionService } from "../services/websocket-connect.service";

export function appInitializer(websocketService: WebsocketConnectionService) {
  return () => {
    return websocketService.connect();
  };
}