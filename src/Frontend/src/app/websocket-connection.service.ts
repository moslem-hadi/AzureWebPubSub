import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import{webSocket} from 'rxjs/webSocket';
import { ConfigService } from './config/config.service';


@Injectable({
  providedIn: 'root'
})
export class WebsocketConnectionService {

  private wssLink: string="";
  constructor(private configService:ConfigService) { 
    //this.wssLink =this.getWssLink();
  }
 
  
  public connect(userId:string , tenantId: string): Observable<any> {
    console.log(userId);
    var observable = new Observable<any>(
      (subcriber) => {
      this.configService.getLink(userId,tenantId).subscribe((link)=>{
        var subject = webSocket(link);
        subject.subscribe({
          next: (msg) => subcriber.next(msg),
          error: (err) => console.error(err),
          complete: () => console.info("complete")
        })

      })
      });
    return observable;
  }

  public addGroup(userId:string , tenantId: string){
    this.configService.addToGroup(userId,tenantId).subscribe(()=>{
      console.log("Added to group "+ tenantId)
    })
  }

}
