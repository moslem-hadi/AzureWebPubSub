import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ConfigService {
  constructor(private http: HttpClient) { }
    apiUrl:string = 'https://localhost:5807/api/pubsub/';

    getLink(userId:string, tenantId:string) {
        return this.http.get<string>(this.apiUrl+`GetWs?userId=${userId}&tenantId=${tenantId}`);
    } 
    addToGroup(userId:string, tenantId:string) {
        return this.http.get<string>(this.apiUrl+`AddGroup?userId=${userId}&tenantId=${tenantId}`);
    }

}