import { Injectable } from '@angular/core';
import { WebsocketConnectService } from './websocket-connect.service';

import { Observable, Observer } from 'rxjs';
import { AnonymousSubject } from 'rxjs/internal/Subject';
import { Subject } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { ReceivedMessage,MessageEvents } from './Messages';


@Injectable({
  providedIn: 'root'
})
export class PubsubConnectService {
  apiUrl = 'https://localhost:5807/api/pubsub';
  private messages: Observable<ReceivedMessage>;
  constructor(private wsService:WebsocketConnectService) { 
  }

  async connect(userId:string, tenantId:string){
    var link = await (await fetch(this.apiUrl+`/negotiate?userId=${userId}`)).text();

    this.messages = <Observable<ReceivedMessage>>this.wsService.connect(link)
        .pipe(
          map(
              (response: MessageEvent): ReceivedMessage => {
                  let data = JSON.parse(response.data)
                  return data;
              }
          )
      );

    let ws = new WebSocket(link);
    ws.onopen = async ()=> {
      await fetch(this.apiUrl+`/join?userId=${userId}&tenantId=${tenantId}`);
    };
  }

eventSubscribe(event: MessageEvents): Observable<ReceivedMessage>{
  return this.messages.pipe(
    filter((msg: ReceivedMessage) =>msg.Event == event),
  );
}

}
