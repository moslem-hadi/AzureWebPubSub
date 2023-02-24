import { Component, OnDestroy, OnInit } from '@angular/core';
import { filter, iif, mergeMap, Subscription } from 'rxjs';
import { MessageEvents, ReceivedMessage } from '../models/ReceivedMessage';
import { WebsocketConnectionService } from '../services/websocket-connect.service';
 
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy  {
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
    this.websocketSub = this.websocket.eventSubscribe(MessageEvents.Maintenance)
      .subscribe((msg:ReceivedMessage)=>{
        this.messagesReceived.push(msg);
        console.log(msg);
      });
  }
  
}
