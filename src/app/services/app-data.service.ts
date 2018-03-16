import {Injectable, Input} from '@angular/core';
import {AuthHttp} from "angular2-jwt";
import {TOKEN_NAME, USERNAME} from "./auth.constant";
import {HttpClient, HttpHeaders} from "@angular/common/http";

import {User} from "../model/User";
import {Observable} from "rxjs/Observable";
import {RegisterUser} from "../model/RegisterUser";
import {tap} from "rxjs/operators";
import {GameSession} from "../model/GameSession";
import {Notifications} from "../model/Notifications";
import {Headers, RequestOptions} from "@angular/http";
import {UserItem} from "../model/UserItem";
import {MainThema} from "../model/MainThema";
import * as Globals from '../../globals';


@Injectable()
export class AppDataService {
  private springURL = Globals.baseUrl+"/api/private";
  public http;

  constructor(http: HttpClient) {
    this.http = http;
  }

  getUser(username): Observable<User> {
    const headers = new HttpHeaders({
      "Content-type": "application/json",
      "Authorization": "Bearer " + sessionStorage.getItem(TOKEN_NAME)
    });


    return this.http.get(this.springURL + "/users/username/" + sessionStorage.getItem(USERNAME), {headers}).map((resp: Response) => new User().fromJSON(resp));

  }

  getProfilePicture() {
    const headers = new HttpHeaders({
      "Accept": "application/octet-stream",
      "Content-Type": "application/octet-stream",
      "Authorization": "Bearer " + sessionStorage.getItem(TOKEN_NAME)
    });

    return this.http.get(this.springURL + "/users/" + sessionStorage.getItem(USERNAME) + "/picture", {
      headers: headers,
      responseType: 'arraybuffer'
    }).map((resp) => {
      let blob = new Blob([resp], {type: 'image/png'});

      let urlCreator = window.URL;
      let testUrl = urlCreator.createObjectURL(blob);

      //let url = URL.createObjectURL(blob);
      return testUrl;
    });
    // return this.http.get(this.springURL + "/users/" + sessionStorage.getItem(USERNAME) + "/picture", {headers: headers, responseType: 'arraybuffer'}).subscribe(
    //   (data) => {
    //     let blob = new Blob([data], {type: 'image/png'});
    //     let url = URL.createObjectURL(blob);
    //     return url;
    //   }
    // );
  }

  getProfilePictureOfUser(username){
    const headers = new HttpHeaders({
      "Accept": "application/octet-stream",
      "Content-Type": "application/octet-stream",
      "Authorization": "Bearer " + sessionStorage.getItem(TOKEN_NAME)
    });
    return this.http.get(this.springURL + "/users/" + username + "/picture", {
      headers: headers,
      responseType: 'arraybuffer'
    }).map((resp) => {
      let blob = new Blob([resp], {type: 'image/png'});

      let urlCreator = window.URL;
      let testUrl = urlCreator.createObjectURL(blob);

      //let url = URL.createObjectURL(blob);
      return testUrl;
    });
  }

  getGameSessionImage(sessionId) {
    const headers = new HttpHeaders({
      "Accept": "application/octet-stream",
      "Content-Type": "application/octet-stream",
      "Authorization": "Bearer " + sessionStorage.getItem(TOKEN_NAME)
    });

    return this.http.get(this.springURL + "/sessions/" + sessionId + "/image", {
      headers: headers,
      responseType: 'arraybuffer'
    }).map((resp) => {
      let blob = new Blob([resp], {type: 'image/png'});
      let urlCreator = window.URL;
      let testUrl = urlCreator.createObjectURL(blob);
      return testUrl;
    });
  }

  getNotificationSettings(id) {
    const headers = new HttpHeaders({
      "Content-type": "application/json",
      "Authorization": "Bearer " + sessionStorage.getItem(TOKEN_NAME)
    });

    return this.http.get(this.springURL + "/users/" + sessionStorage.getItem(USERNAME) + "/sessions/" + id + "/notifications", {headers})
      .map((resp: Response) => new Notifications(false, false, false, false).fromJSON(resp));
  }

  getGameSessions() {
    const headers = new HttpHeaders({
      "Content-type": "application/json",
      "Authorization": "Bearer " + sessionStorage.getItem(TOKEN_NAME)
    });

    let gameSessions: GameSession[] = [];
    //return this.http.get(this.springURL + "/temp/gamesessions", {headers}).map((resp: Response) => new GameSession('', '','','','','','','').fromJSON(resp));
    return this.http.get(this.springURL + "/" + sessionStorage.getItem(USERNAME) + "/gamesessions", {headers}).map((resp) => {

      resp.forEach(gameSession => {
        let session = new GameSession('', '', '', '', '', '', '', '', '').fromJSON(gameSession);
        gameSessions.push(session);
      });
      return gameSessions;

    });
  }

  getUsersFromSession(sessionId){
    const headers = new HttpHeaders({
      "Content-type": "application/json",
      "Authorization": "Bearer " + sessionStorage.getItem(TOKEN_NAME)
    });

    let users : UserItem[] = [];
    return this.http.get(this.springURL + "/sessions/" + sessionId + "/users", {headers}).map((resp) =>{
      resp.forEach(userDto => {
        let user = new UserItem().fromJSON(userDto);
        users.push(user);
      });
      return users;
    });
  }

  getAllUsers(){
    const headers = new HttpHeaders({
      "Content-type": "application/json",
      "Authorization": "Bearer " + sessionStorage.getItem(TOKEN_NAME)
    });

    let users : UserItem[] = [];
    return this.http.get(this.springURL + "/users/limited", {headers}).map((resp) =>{
      resp.forEach(userDto => {
        let user = new UserItem().fromJSON(userDto);
        users.push(user);
      });
      return users;
    });
  }

  addUserToGameSession(gameSessionId, usernameToAdd){
    const headers = new HttpHeaders({
      "Content-type": "application/json",
      "Authorization": "Bearer " + sessionStorage.getItem(TOKEN_NAME)
    });

    return this.http.post(this.springURL + "/sessions/" + gameSessionId + "/users/" + usernameToAdd, null, {headers: headers});
  }

  removeUserFromGameSession(gameSessionId, usernameToRemove){
    const headers = new HttpHeaders({
      "Content-type": "application/json",
      "Authorization": "Bearer " + sessionStorage.getItem(TOKEN_NAME)
    });

    return this.http.delete(this.springURL + "/sessions/" + gameSessionId + "/users/" + usernameToRemove + "/remove", {headers: headers});

  }

  createGameSession(gameSesion: GameSession) {
    const headers = new HttpHeaders({
      "Authorization": "Bearer " + sessionStorage.getItem(TOKEN_NAME)
    });
    //TODO
    // return this.http.post(this.springURL + "/sessions", gameSesion, {headers: headers}).map((resp: Response) => resp);
    return this.http.post(this.springURL + "/sessions", gameSesion, {headers: headers}).map((resp: Response) => resp);
  }

  updateUser(user: RegisterUser) {
    const headers = new HttpHeaders({
      "Content-type": "application/json",
      "Authorization": "Bearer " + sessionStorage.getItem(TOKEN_NAME)
    });

    //map((resp: Response) => new User().fromJSON(resp));

    return this.http.put(this.springURL + "/users/" + user.username, user, {headers: headers}).map((resp: Response) => new User().fromJSON(resp));
  }

  updateNotificationsForGameSession(username, id, notifications) {
      const headers = new HttpHeaders({
        "Content-type": "application/json",
        "Authorization": "Bearer " + sessionStorage.getItem(TOKEN_NAME)
      });

      return this.http.post(this.springURL + "/users/" + username + "/sessions/" + id, notifications, {headers: headers}).map((resp: Response) => resp);
    }


    ///api/private/sessions/{id}/users/{username}/upgradeacceslevel
  grantSubModeratorAccessLevel(sessionId, username){
    const headers = new HttpHeaders({
      "Content-type": "application/json",
      "Authorization": "Bearer " + sessionStorage.getItem(TOKEN_NAME)
    });

    return this.http.post(this.springURL + "/sessions/" + sessionId + "/users/" + username + "/upgradeacceslevel", null, {headers: headers}).map((resp: Response) => resp);
  }

  downGradeToParticipantAccessLevel(sessionId, username){
    const headers = new HttpHeaders({
      "Content-type": "application/json",
      "Authorization": "Bearer " + sessionStorage.getItem(TOKEN_NAME)
    });

    return this.http.post(this.springURL + "/sessions/" + sessionId + "/users/" + username + "/downgradeacceslevel", null, {headers: headers}).map((resp: Response) => resp);
  }


  updatePassword(user){
    const headers = new HttpHeaders({
      "Content-type": "application/json",
      "Authorization": "Bearer " + sessionStorage.getItem(TOKEN_NAME)
    });

    return this.http.post(this.springURL + "/users/" + sessionStorage.getItem(USERNAME) + "/updatepassword", user, {headers: headers}).map((resp: Response) => resp);
  }

  createMainTheme(mainTheme){
    const headers = new HttpHeaders({
      "Content-type": "application/json",
      "Authorization": "Bearer " + sessionStorage.getItem(TOKEN_NAME)
    });

    this.http.post(this.springURL + "/themes", mainTheme, {headers: headers}).map((resp: Response) => resp);
  }

  getAllConnectedMainThemes(){
    const headers = new HttpHeaders({
      "Content-type": "application/json",
      "Authorization": "Bearer " + sessionStorage.getItem(TOKEN_NAME)
    });

    let mainThemes: MainThema[] = [];
    return this.http.get(this.springURL + "/users/" + sessionStorage.getItem(USERNAME) + "/connectedthemes", {headers: headers}).map((resp) => {
      resp.forEach(themeDto =>{
        let theme = new MainThema('','','','').fromJSON(themeDto);
        mainThemes.push(theme);
      });
      return mainThemes;
    });
  }

}


