import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { MessageEvents, ReceivedMessage } from '../models/ReceivedMessage';
import { WebsocketConnectionService } from '../services/websocket-connect.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit, OnDestroy  {
  title = 'AzureSubscriber';

  private websocketSub: Subscription;

  messagesReceived: Array<ReceivedMessage> = [];

  constructor(private websocket: WebsocketConnectionService){
   
  } 
  ngOnDestroy(): void {
    if(this.websocketSub != undefined)
       this.websocketSub.unsubscribe()
  }
  ngOnInit(): void {
    this.websocketSub = this.websocket.eventSubscribe(MessageEvents.Notification)
      .subscribe((msg:ReceivedMessage)=>{
        this.messagesReceived.push(msg);
      });
  }
}
