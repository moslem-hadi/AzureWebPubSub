export interface ReceivedMessage{
    Data: any,
    Date: Date,
    Event: MessageEvents
  }
  
  export enum MessageEvents
  {
      Maintenance = 'Maintenance',
      NewNotification ='NewNotification'
  }