import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {AppDataService} from "../../services/app-data.service";
import {TOKEN_NAME, USERNAME} from "../../services/auth.constant";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Headers, Http, RequestOptions} from "@angular/http";
import {Observable} from "rxjs/Observable";
import {DomSanitizer} from '@angular/platform-browser';
import {User} from "../../model/User";
import * as Globals from '../../../globals';

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.css']
})
export class ImageUploadComponent implements OnInit {
  private fileService: AppDataService;
  public image: File;
  @Input() public imageUrl: String = "https://www.vccircle.com/wp-content/uploads/2017/03/default-profile.png";
  @Input() public typeOfUpload;
  @Input() public createdSessionId;
  @Output() profilePictureChanged: EventEmitter<String> = new EventEmitter<String>();
  @Output() pageChanged: EventEmitter<String> = new EventEmitter<String>();
  @Output() imageData: EventEmitter<FormData> = new EventEmitter<FormData>();
  @ViewChild("imageInput") imageInput;


  actionUrl: String;
  domSanitizerService;
  private http: Http;
  formData;
  options;

  constructor(http: Http, private domSanitizer: DomSanitizer) {
    this.http = http;
    this.domSanitizerService = this.domSanitizer;
  }

  form = new FormGroup({
    'file': new FormControl('')
  });

  fileChange(event){
   this.image = event.target.files[0];
   this.readUrl(event);

   let fileList: FileList = event.target.files;

   if(fileList.length > 0) {
     let file: File = fileList[0];
     this.formData= new FormData();


     this.formData.append('uploadFile', file, file.name);

     let headers = new Headers();

     headers.append("Authorization", "Bearer " + sessionStorage.getItem(TOKEN_NAME));
     headers.append('Accept', 'application/json');

     this.options = new RequestOptions({ headers: headers });

   }
 }

  doUploadFile(){
    if(this.typeOfUpload === 'profilePicture'){
      this.actionUrl = Globals.baseUrl+"/api/private/users/" + sessionStorage.getItem(USERNAME) + "/uploadImage";
    }
    else if(this.typeOfUpload === 'gameSessionImage'){
      this.actionUrl = Globals.baseUrl+"/api/private/users/" + sessionStorage.getItem(USERNAME) + "/sessions/" + this.createdSessionId + "/uploadImage";
    }
    else{
      this.imageData.emit(this.formData);
    }

    this.http.post(this.actionUrl.toString(), this.formData, this.options)
      .subscribe(
        (data) => {
          this.profilePictureUpdated();
          this.sendPage("session");
        },
        (error) => console.log(error.status)
      );
  }

  profilePictureUpdated(){
    this.profilePictureChanged.emit(this.imageUrl);
  }

  onChange(event){
    this.image = event.target.files[0];
    this.readUrl(event);
  }

  readUrl(event){
    if(event.target.files && event.target.files[0]){
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imageUrl = e.target.result;
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  }

  ngOnInit() {
    this.actionUrl = Globals.baseUrl+"/api/private/users/" + sessionStorage.getItem(USERNAME) + "/uploadImage";
  }

  sendPage(page){
    this.pageChanged.emit(page);
  }

  reset(){
    this.imageUrl = "https://www.vccircle.com/wp-content/uploads/2017/03/default-profile.png";
    this.imageInput.nativeElement.value = "";
  }

  resetImageInput(){
    this.imageInput.nativeElement.value = "";
  }
}
