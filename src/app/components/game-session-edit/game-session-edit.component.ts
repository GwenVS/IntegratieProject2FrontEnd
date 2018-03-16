import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {UserItem} from "../../model/UserItem";
import {AppDataService} from "../../services/app-data.service";
import {DomSanitizer} from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import {CompleterData, Ng2CompleterModule, CompleterService,} from "ng2-completer";
import {USERNAME} from "../../services/auth.constant";

@Component({
  selector: 'app-game-session-edit',
  templateUrl: './game-session-edit.component.html',
  styleUrls: ['./game-session-edit.component.css']
})
export class GameSessionEditComponent implements OnInit {

  @Input() public chosenGameSessionId;
  @Output() pageChanged: EventEmitter<any> = new EventEmitter<any>();
  users: UserItem[] = [];
  private http;
  domSanitizerService;

  //
  searchString;
  searchData;
  public dataService: CompleterData;
  protected completerService;

  username;
  role;

  constructor(http: AppDataService, private domSanitizer: DomSanitizer, completerService: CompleterService) {
    this.http = http;
    this.domSanitizerService = domSanitizer;
    this.completerService = completerService;
    this.username = sessionStorage.getItem(USERNAME);
  }


  ngOnInit() {
    this.getAllUsersFromSession();
    this.getAllUsers();
  }

  getAllUsersFromSession(){
    this.http.getUsersFromSession(this.chosenGameSessionId).subscribe(
      (data) => {
        this.users = data;
        this.checkForRole();
        this.getProfilePicturesOfUsers();
      }
    );
  }

  checkForRole(){
    this.users.forEach(user =>{
      if (user.getUsername() === this.username) this.role = user.getRole();
    })
  }

  getAllUsers(){
    this.http.getAllUsers().subscribe(
      (data) => {
        this.searchData = data;
        this.getProfilePicturesOfUsers2();
        this.initialiseSearchDataSets();
      }
    );
  }

  getProfilePicturesOfUsers() {
    for (let i = 0; i < this.users.length; i++) {
      let username = this.users[i].getUsername();
      this.http.getProfilePictureOfUser(username).subscribe(
        (data) => {
          this.users[i].setProfilePicture(data);
        }
      );
    }
  }

  getProfilePicturesOfUsers2() {
    for (let i = 0; i < this.searchData.length; i++) {
      let username = this.searchData[i].getUsername();
      console.log(username);
      this.http.getProfilePictureOfUser(username).subscribe(
        (data) => {
          this.searchData[i].setProfilePicture(data);
          this.domSanitizerService.bypassSecurityTrustUrl(this.searchData[i].getProfilePicture());
        }
      );
    }

  }

  initialiseSearchDataSets() {
    this.dataService = this.completerService.local(this.searchData, 'username', 'username');
      //.imageField('profilePicture');
  }

  onAddUserClick() {
    if (this.searchString != "") {
      this.http.addUserToGameSession(this.chosenGameSessionId, this.searchString).subscribe(
        (data) => this.getAllUsersFromSession(),
        (error) => console.log(error.status)
      );
    }
  }

  onRemoveUserClick(event){
    let username = event.target.attributes.id.value;
    this.http.removeUserFromGameSession(this.chosenGameSessionId, username).subscribe(
        (data) => this.getAllUsersFromSession(),
        (error) => console.log(error.status)
      );
  }

  onGrantRightsClick(event){
    let username = event.target.attributes.id.value;
    this.http.grantSubModeratorAccessLevel(this.chosenGameSessionId, username).subscribe(
      (data) => this.getAllUsersFromSession(),
      (error) => console.log(error)
    );
  }

  onRevokeRightsClick(event){
    let username = event.target.attributes.id.value;
    //TODO CALL
  }


}
