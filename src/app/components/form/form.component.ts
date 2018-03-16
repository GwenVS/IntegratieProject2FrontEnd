import { Component } from '@angular/core';
import {HttpLoginServiceService} from "../../services/http-login-service.service";

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent {
  loginForm = false;
  public service: HttpLoginServiceService;

  constructor(service: HttpLoginServiceService){
    this.service = service;
  }

  clickLoginForm() {
    this.loginForm = true;
  }

  clickSignUpForm() {
    this.service.registrationComplete = false;
    this.loginForm = false;
  }
}
