import { Component, OnDestroy, OnInit } from '@angular/core';
import { filter, iif, mergeMap, Subscription } from 'rxjs';
import { MessageEvents, ReceivedMessage } from '../services/Messages';
import { PubsubConnectService } from '../services/pubsub-connect.service';
 
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit,OnDestroy  {
  title = 'AzureSubscriber';
  messagesReceived: Array<ReceivedMessage> = [];
  selectedUser: string =crypto.randomUUID();
  selectedTenantId: string =crypto.randomUUID();
  connected:boolean = false;
  loading: boolean = false;
  messageEvent = MessageEvents;
  sub:Subscription;


  constructor(private pubSubService: PubsubConnectService){
   
  }
  ngOnDestroy(): void {
    if(this.sub != undefined)
      this.sub.unsubscribe();
  }

  ngOnInit(): void {
 
  }


  connect(){
    this.loading=true;
    this.pubSubService.connect(this.selectedUser,this.selectedTenantId)
    .then(event => 
      {
      this.connected = true;
      this.loading=false;

      this.sub = this.pubSubService.eventSubscribe(MessageEvents.Maintenance)
      .subscribe((msg:ReceivedMessage)=>{
        this.messagesReceived.push(msg);
      });
     
    });


    
    // this.loading=true;
    // var apiUrl = 'https://localhost:5807/api/pubsub/';
    // var link = await (await fetch(apiUrl+`GetWs?userId=${this.selectedUser}&tenantId=${this.selectedTenantId}`)).text();

    // let ws = new WebSocket(link);
    // ws.onopen = async ()=> {
    //   await fetch(apiUrl+`AddGroup?userId=${this.selectedUser}&tenantId=${this.selectedTenantId}`);
    //   this.connected = true;
    //   this.loading=false;

    // };

    // ws.onmessage = (event)=>{
    //   let message:Message = JSON.parse(event.data)
    //   this.messagesReceived.push(message);
    // }


  }



  //   this.wsService.connect(this.selectedUser,'tenant1')
  //   .subscribe((msg)=>{
  //     console.log(msg);
  //     this.messagesReceived.push(msg.Content);
  // });
  //}

  // AddToGroup(){
  //   this.wsService.addGroup(this.selectedUser,'tenant1');
  // }
  

  
}
