import { Injectable } from '@angular/core';
import {  filter, Observable, retry, RetryConfig, Subject } from 'rxjs';

import { webSocket } from 'rxjs/webSocket';
import { MessageEvents, ReceivedMessage } from '../models/ReceivedMessage';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class WebsocketConnectionService {
  private apiUrl = 'https://localhost:7027/pubsub';
  private connected = false;
  private retryConfig: RetryConfig = {
    delay: 5000,
    count: 5,
    resetOnSuccess: true
  };
  public messages: Subject<ReceivedMessage> = new Subject<ReceivedMessage>();
  constructor(private authService: AuthService) {
  }

  async connect(){
    var wsLink = await (await fetch(this.apiUrl+`/negotiate?userId=${this.authService.getUserId()}`)).text();
    let ws = webSocket<any>({
      url: wsLink,
      openObserver: {
        next: async () => {
            console.log("connected to websocket");
            
          if(!this.connected){
            await fetch(this.apiUrl+`/join?userId=${this.authService.getUserId()}&tenantId=${this.authService.getGroupId()}`);
          this.connected=true;
          }
        },
      },
      closeObserver:{ next:()=>console.log("websocket closed")},

    });

    ws.pipe(
      retry(this.retryConfig) 
      ).subscribe(this.messages);
  }

  
eventSubscribe(event: MessageEvents): Observable<any>{
  return this.messages?.pipe(
    filter((msg: ReceivedMessage) =>msg.Event == event))
}
 
}
