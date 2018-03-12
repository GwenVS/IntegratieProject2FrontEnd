import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Http} from '@angular/http';
import {User} from '../../model/User';
import {GameSession} from '../../model/GameSession';
declare var require: any;
const SockJS = require('sockjs-client');
const Stomp = require('stompjs');
import {Message} from '../../model/Message';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  @Input() user: User = null;
  @Input() session: GameSession = null;
  chatroom: Message[];
  private stompClient;
  message: Message;

  constructor() {
    const socket = new SockJS('http://localhost:9090/chat');
    this.stompClient = Stomp.over(socket);
    const that = this;
    this.stompClient.connect({}, function (frame) {
      console.log('Connected: ' + frame);
      that.stompClient.subscribe('/chatroom/' + /*this.session.gameSessionId*/1, function (message) {
        that.pushMessage(JSON.parse(message.body));
      });
    });
  }

  private pushMessage(message) {
    this.chatroom.push(message);
  }

  ngOnInit(): void {
    this.chatroom = [];
    this.message = new Message(this.user, this.session, '', null);
  }

  sendMessage(content) {
    this.message.user = this.user;
    this.message.session = this.session;
    this.message.content = content;
    this.stompClient.send('/app/send/message/' + /*this.session.gameSessionId*/1, {},  JSON.stringify(this.message));
    this.message.content = '';
  }
}
