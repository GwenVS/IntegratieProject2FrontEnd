import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {Router} from "@angular/router";
import {HttpLoginServiceService} from "../../services/http-login-service.service";
import {UserService} from "../../services/user.service";
import {AppDataService} from "../../services/app-data.service";
import {TOKEN_NAME, USERNAME} from "../../services/auth.constant";
import {User} from "../../model/User";
import {DomSanitizer} from '@angular/platform-browser';
import {ElementRef} from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit{
  router: Router;
  service: HttpLoginServiceService;
  session = true;
  profile = false;
  profileImageUpload = false;
  user$: User;
  page = 'session';
  activeSessionsNumber: 0;
  chosenGameSessionId: Number;
  imageSrc = "https://www.vccircle.com/wp-content/uploads/2017/03/default-profile.png";
  domSanitizerService;
  @ViewChild('session') sessionElement:ElementRef;
  @ViewChild('profile') profileElement:ElementRef;
  activeItem;


  constructor(router: Router, service: HttpLoginServiceService, private userService: UserService, private appDataService: AppDataService, private domSanitizer: DomSanitizer) {
    this.router = router;
    this.service = service;
    this.domSanitizerService = this.domSanitizer;
  }

  ngOnInit() {
    this.user$ = new User();
    this.appDataService.getUser(sessionStorage.getItem(USERNAME)).subscribe(data => {
        this.user$ = data;
      },
      err => this.router.navigateByUrl('login')
    );

    this.appDataService.getProfilePicture().subscribe(
      (data) => {
        this.imageSrc = data;
      }
    );

  }

  ngAfterViewInit()
  {
    this.activeItem = this.sessionElement.nativeElement;
    this.changeActive(this.activeItem);
  }

  changeActive(newActiveItem){
    this.activeItem.classList.remove('active');
    this.activeItem = newActiveItem;
    this.activeItem.classList.add('active');
  }

  sessionClick(){
    this.changeActive(this.sessionElement.nativeElement);
    this.session = true;
    this.profileImageUpload = false;
    this.profile = false;
    this.page = 'session';
  }

  profileClick(){
    this.changeActive(this.profileElement.nativeElement);
    this.profile = true;
    this.session = false;
    this.profileImageUpload = false;
    this.page = 'profile';

  }

  profileImageUploadClick(){
    this.page = 'imageUpload';
  }

  onPageChanged(newPage){
    this.page = newPage;
  }

  onUserChanged(user){
    this.user$ = user;
  }

  updateActiveSessions(number){
    this.activeSessionsNumber = number;
}

  setChosenGameSessionId(id){
    this.chosenGameSessionId = id;
  }

  updateProfilePicture(newUrl){
    this.imageSrc = newUrl;
  }

  myThemesClick(){
    this.page = 'myThemes';
  }

  logout(){
    sessionStorage.clear();
    this.router.navigateByUrl("login");
  }


}
