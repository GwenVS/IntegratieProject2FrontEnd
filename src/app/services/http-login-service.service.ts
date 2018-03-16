import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http'
import {LoginUser} from "../model/loginUser";
import {Observable} from "rxjs/Observable";
import {catchError, tap} from "rxjs/operators";
import {RegisterUser} from "../model/RegisterUser";
import {TOKEN_NAME, USERNAME} from "./auth.constant";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {User} from "../model/User";
import * as Globals from '../../globals';


//const httpOptions = {headers: new HttpHeaders()};
const httpOptions2 = {headers: new HttpHeaders({'content-type': 'application/json'})};
const headers = new HttpHeaders();


@Injectable()
export class HttpLoginServiceService {
  private baseURL = '/api/public';
  private port = 9090;
  private springURL = Globals.baseUrl + this.baseURL;
  private _error;
  private _registrationComplete = false;




  constructor(private http: HttpClient) { }

/*  doRegister(registerUser: RegisterUser) {
    const url = this.springURL + '/register';
    console.log(registerUser.birthday, registerUser.firstName, registerUser.gender);
    return this.http.post(url, registerUser, {headers}).subscribe(
      (data) => this._registrationComplete = true,
      (err) => this._error = err.error
    );
  }*/

  doRegister(registerUser: RegisterUser) {
    const url = this.springURL + '/register';

    const headers = new HttpHeaders({
      "Content-type": "multipart/form-data; boundry=pleaseJustWork",
    });

    //(this.springURL + "/users/username/" + sessionStorage.getItem(USERNAME), {headers}).map((resp: Response) => new User().fromJSON(resp));


    return this.http.post(url, registerUser).pipe(
      tap((regUser: RegisterUser) => this.registrationComplete = true)
    );
  }


  get error() {
    return this._error;
  }


  get registrationComplete(): boolean {
    return this._registrationComplete;
  }


  set registrationComplete(value: boolean) {
    this._registrationComplete = value;
  }
}
