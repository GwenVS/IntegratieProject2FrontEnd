import {FormControl, FormGroup, Validators} from "@angular/forms";
import {User} from "../../model/User";
import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AppDataService} from "../../services/app-data.service";
import {RegisterUser} from "../../model/RegisterUser";
import {USERNAME} from "../../services/auth.constant";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit{

   @Input() public _user$: User;
   @Output() userChanged: EventEmitter<User> = new EventEmitter<User>();
   updatedUser: RegisterUser;
   public _passwordsAreTheSame: boolean = false;
   public passwordError = "Passwords are not the same!";
   copyUser: User;
   updateUser: RegisterUser = new RegisterUser('','','','','','','', '');
   @Input() public imageSrc: String;
  @Output() profilePictureChanged: EventEmitter<String> = new EventEmitter<String>();


  updateUserDetails: Boolean = true;
  message = '';

  form = new FormGroup({
    'firstName': new FormControl('', [Validators.required, Validators.minLength(3)]),
    'lastName': new FormControl('', [Validators.required, Validators.minLength(3)]),
    'username': new FormControl(),
    'email': new FormControl(),
    'birthday': new FormControl('', [Validators.required]),
    'gender': new FormControl('', [Validators.required])
  });

  changePasswordForm = new FormGroup({
    'password': new FormControl('', [Validators.required, Validators.minLength(8)]),
    'password2': new FormControl('', [Validators.required, Validators.minLength(8)])
  });

  constructor(private appDataService: AppDataService) {

  }

  ngOnInit(): void {
    this.updatedUser= new RegisterUser('','','','','','','', '');
    this.updatedUser.username = this._user$.username;
    this.updatedUser.firstName = this._user$.firstName;
    this.updatedUser.lastName = this._user$.lastName;
    this.updatedUser.email = this._user$.email;
    this.updatedUser.birthday = this._user$.birthday;
    this.updatedUser.gender = this._user$.gender;
  }

  checkPassword(){
    let password:String = this.changePasswordForm.get('password').value;
    let password2:String = this.changePasswordForm.get('password2').value;


    if(password === password2){
      this._passwordsAreTheSame = true;
    }
    else{
      this._passwordsAreTheSame = false;
    }
  }

  get passwordsAreTheSame(): boolean {
    return this._passwordsAreTheSame;
  }

  set passwordsAreTheSame(value: boolean) {
    this._passwordsAreTheSame = value;
  }

  get password() {
    return this.changePasswordForm.get('password');
  }

  get password2() {
    return this.changePasswordForm.get('password2');
  }

  get birthday() {
    return this.form.get('birthday');
  }

  get gender() {
    return this.form.get('gender');
  }

  onUserChanged(){
    this.userChanged.emit(this._user$);
  }

  onProfilePictureChanged(newUrl){
    this.profilePictureChanged.emit(newUrl);
  }

  changeUser(){
    if(this.form.valid){
      this.appDataService.updateUser(this.updatedUser).subscribe(
        data => {
          this._user$ = data;
          this.message = "Your details were updated successfully";
          this.onUserChanged();
        },
        error => this.message = "Oeps something went wrong while updating your details. Try again later!"
    );
    }
  }

  onChange(event){
    console.log(event);
  }

  onChangePasswordClicked(){
    this.message = "";
    this.updateUserDetails = false;
  }

  onChangeUserDetailsClicked(){
    this.message = "";
    this.updateUserDetails = true;
  }

  updatePassword(){
    if(this.changePasswordForm.valid){
      this.appDataService.updatePassword(this.updatedUser).subscribe(
        (data) => this.message = "Password updated successfully",
        (error) => this.message = "Something went wrong while updating your password!"
      );
    }
  }
}
