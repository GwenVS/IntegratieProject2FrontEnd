import {Component, Input, OnInit} from '@angular/core';
import {UserItem} from "../../model/UserItem";
import {AppDataService} from "../../services/app-data.service";
import {DomSanitizer} from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import {CompleterData, Ng2CompleterModule, CompleterService,} from "ng2-completer";

@Component({
  selector: 'app-game-session-edit',
  templateUrl: './game-session-edit.component.html',
  styleUrls: ['./game-session-edit.component.css']
})
export class GameSessionEditComponent implements OnInit {

  @Input() public chosenGameSessionId;
  users: UserItem[] = [];
  private http;
  domSanitizerService;

  //
  searchString;
  searchData;
  protected dataService: CompleterData;
  protected completerService;


  constructor(http: AppDataService, private domSanitizer: DomSanitizer, completerService: CompleterService) {
    this.http = http;
    this.domSanitizerService = domSanitizer;
    this.completerService = completerService;
  }


  ngOnInit() {
    this.getAllUsersFromSession();
    this.getAllUsers();
  }

  getAllUsersFromSession(){
    this.http.getUsersFromSession(this.chosenGameSessionId).subscribe(
      (data) => {
        this.users = data;
        this.getProfilePicturesOfUsers();
      }
    );
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
    this.dataService = this.completerService.local(this.searchData, 'username', 'username').imageField('profilePicture');
  }

  onAddUserClick() {
    if (this.searchString != "") {
      this.http.addUserToGameSession(this.chosenGameSessionId, this.searchString).subscribe(
        (data) => this.getAllUsersFromSession(),
        (error) => console.log(error.status)
      );
    }

  }

  onGrantRightsClick(event){
    let username = event.target.attributes.id.value;
    this.http.grantSubModeratorAccessLevel(this.chosenGameSessionId, username).subscribe(
      (data) => this.getAllUsersFromSession(),
      (error) => console.log(error)
    );
  }


}
