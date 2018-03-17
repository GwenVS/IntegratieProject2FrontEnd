export class Message {
  public messageId;
  public sender;
  public session;
  public content;
  public dateTime: Date;


  constructor(sender, content, session, dateTime: Date) {
    this.sender = sender;
    this.session = session;
    this.content = content;
    this.dateTime = dateTime;
  }
}
