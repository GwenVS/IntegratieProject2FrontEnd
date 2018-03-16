import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Http} from "@angular/http";
import {HttpLoginServiceService} from "../../services/http-login-service.service";
import {LoginUser} from "../../model/loginUser";
import {Router} from "@angular/router";
import {UserService} from "../../services/user.service";
import {AuthService} from "../../services/auth.service";
import {TOKEN_NAME} from "../../services/auth.constant";

@Component({
  selector: 'login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit{
  private service: AuthService;
  private httpService: HttpLoginServiceService;
  loginUser = new LoginUser('','');
  public router: Router;
  public error = '';
  public feedback='';

  constructor(router: Router, private userService: UserService, private authService: AuthService, private httpLoginService: HttpLoginServiceService) {
    this.service = authService;
    this.router = router;
    this.httpService = httpLoginService;
  }

  form = new FormGroup({
    'username': new FormControl('', [Validators.required, Validators.minLength(3)]),
    'password': new FormControl('', [Validators.required])
  });

  ngOnInit(): void {
    //this.userService.logout();
    if (this.httpService.registrationComplete){
      this.feedback = 'You are registered.';
    }
  }

  get username() {
    return this.form.get('username');
  }

  get password() {
    return this.form.get('password');
  }

  clickLogin(){
   this.authService.login(this.loginUser)
      .subscribe(
        res => {
          if (res) {
            this.userService.login(res);
            this.router.navigateByUrl('main');
          } else {
            this.error = 'Username or password incorrect!';
          }
        },
        err => {
          this.error = 'Username or password incorrect!';
        }
      )
  }

}
