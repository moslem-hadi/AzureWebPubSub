import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs';
import { AnonymousSubject } from 'rxjs/internal/Subject';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { ReceivedMessage } from './Messages';



@Injectable({
  providedIn: 'root'
})


export class WebsocketConnectService {
  private observable: Observable<MessageEvent>;
  public messages: Subject<ReceivedMessage>;

  constructor() {
      // this.messages = <Subject<Message>>this.connect(CHAT_URL).pipe(
      //     map(
      //         (response: MessageEvent): Message => {
      //             console.log(response.data);
      //             let data = JSON.parse(response.data)
      //             return data;
      //         }
      //     )
      // );
  }

  public connect(CHAT_URL:string): Observable<MessageEvent> {
      if (!this.observable) {
          this.observable = this.create(CHAT_URL);
          console.log("Successfully connected: " + CHAT_URL);
      }
      return this.observable;
  }

  private create(CHAT_URL:string): Observable<MessageEvent> {
      let ws = new WebSocket(CHAT_URL);
      let observable = new Observable((obs: Observer<MessageEvent>) => {
          ws.onmessage = obs.next.bind(obs);
          ws.onerror = obs.error.bind(obs);
          ws.onclose = obs.complete.bind(obs);
          return ws.close.bind(ws);
      });

      return observable;
      // let observer:Observer<MessageEvent<any>> = {
      //   next: (data: Object) => {
      //     console.log('Message sent to websocket: ', data);
      //     if (ws.readyState === WebSocket.OPEN) {
      //       ws.send(JSON.stringify(data));
      //     }
      //   },
      //   error: function (err: any): void {
      //     throw new Error('Function not implemented.');
      //   },
      //   complete: function (): void {
      //     throw new Error('Function not implemented.');
      //   }
      // };
      // return new AnonymousSubject<MessageEvent>(observer, observable);
  }
}