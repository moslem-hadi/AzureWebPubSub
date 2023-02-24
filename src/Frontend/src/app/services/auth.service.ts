import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
//sample service
export class AuthService {

  constructor() { }

  public getGroupId() {
    return '3fa85f64-5717-4562-b3fc-2c963f66afa6';
  } 
  public getUserId() {
    return '4a833cae-3d4b-4f9c-bf71-9c6581827a79';
  }
}
