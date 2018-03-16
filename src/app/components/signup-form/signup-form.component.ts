import {Component, ViewChild} from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {HttpLoginServiceService} from "../../services/http-login-service.service";
import {RegisterUser} from "../../model/RegisterUser";

@Component({
  selector: 'signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.css']
})
export class SignupFormComponent {
  private service: HttpLoginServiceService;
  registerUser: RegisterUser = new RegisterUser('','','','','','','', '');
  public label;
  public _passwordsAreTheSame: boolean = false;
  public passwordError = "Passwords are not the same!";
  formHasErrors = false;

  constructor(service: HttpLoginServiceService){
    this.service = service;
  }

  form = new FormGroup({
    'username': new FormControl('', [Validators.required, Validators.minLength(4)]),
    'password': new FormControl('', [Validators.required, Validators.minLength(8)]),
    'password2': new FormControl('', [Validators.required, Validators.minLength(8)]),
    'firstName': new FormControl('', [Validators.required, Validators.minLength(1)]),
    'lastName': new FormControl('', [Validators.required]),
    'email': new FormControl('', [Validators.required]),
    'birthday': new FormControl('', [Validators.required]),
    'gender': new FormControl('', [Validators.required]),
    'profilePicture': new FormControl('')
  });

  checkPassword(){
    let password:String = this.form.get('password').value;
    let password2:String = this.form.get('password2').value;

    if(password === password2){
      this._passwordsAreTheSame = true;
    }
    else{
      this._passwordsAreTheSame = false;
    }
  }

  get username() {
    return this.form.get('username');
  }

  get password() {
    return this.form.get('password');
  }

  get password2() {
    return this.form.get('password2');
  }

  get firstName() {
    return this.form.get('firstName');
  }

  get lastName() {
    return this.form.get('lastName');
  }

  get email() {
    return this.form.get('email');
  }

  get birthday() {
    return this.form.get('birthday');
  }

  get gender() {
    return this.form.get('gender');
  }

  get profilePicture(){
    return this.form.get('profilePicture');
  }

  clickRegister(){
    if(this.form.valid && this._passwordsAreTheSame){
      this.service.doRegister(this.registerUser).subscribe((data) => {}, error => console.log(this.label = error.error));
    }
  }


}
