import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Http} from '@angular/http';
import {User} from '../../model/User';
import {GameSession} from '../../model/GameSession';

declare var require: any;
const SockJS = require('sockjs-client');
const Stomp = require('stompjs');
import {Message} from '../../model/Message';
import * as Globals from '../../../globals';
import {forEach} from '@angular/router/src/utils/collection';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  @Input('userName') user: string;
  @Input() session: GameSession = null;
  chatroom: Message[];
  private stompClient;
  message: Message;

  constructor() {
    const socket = new SockJS(Globals.baseUrl + '/chat');
    this.stompClient = Stomp.over(socket);
    const that = this;
    this.stompClient.connect({}, function (frame) {
      console.log('Connected: ' + frame);
      that.stompClient.subscribe('/room/subscribe/' + 1, function (messages) {
        const messList:Message[] = JSON.parse(messages.body);
        for (let index = 0; index < messList.length; ++index) {
          if (messList[index].content!=null) {
          that.pushMessage(messList[index]);
          }
        }
      });
      that.stompClient.subscribe('/chatroom/' + /*this.session.gameSessionId*/1+'/chat', function (message) {
        that.pushMessage(JSON.parse(message.body));
      });
    });
  }

  private pushMessage(message) {
    this.chatroom.push(message);
  }

  ngOnInit(): void {
    this.chatroom = [];
    this.message = new Message(this.user, '', this.session, null);
  }

  sendMessage(content) {
    this.message.sender = this.user;
    this.message.session = this.session;
    this.message.content = content;
    this.stompClient.send('/room/send/message/' + /*this.session.gameSessionId*/1, {}, JSON.stringify(this.message));
    this.message.content = null;
    console.log('Send!');
  }
}
