export interface ReceivedMessage{
  Content:string,
  Date: Date,
  Event: MessageEvents
}

export enum MessageEvents
{
    ActivityCreated,
    Maintenance,
    NewNotification
}