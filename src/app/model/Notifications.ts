export class Notifications {
  public startGame:Boolean;
  public endGame:Boolean;
  public yourTurn:Boolean;
  public endTurn:Boolean;


  constructor(startGame: Boolean, endGame: Boolean, yourTurn: Boolean, endTurn: Boolean) {
    this.startGame = startGame;
    this.endGame = endGame;
    this.yourTurn = yourTurn;
    this.endTurn = endTurn;
  }

  fromJSON(obj: any){
    this.startGame = obj.startGame;
    this.endGame = obj.endGame;
    this.yourTurn = obj.yourTurn;
    this.endTurn = obj.endTurn;
    return this;
  }

}
