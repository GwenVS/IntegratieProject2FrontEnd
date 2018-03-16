import {Component, OnInit, AfterViewInit} from '@angular/core';
import {Http} from "@angular/http";
import {Theme} from "../../model/theme";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import * as Globals from '../../../globals';

@Component({
  selector: 'app-session-setup',
  templateUrl: './session-setup.component.html',
  styleUrls: ['./session-setup.component.css', '../card/card.component.css']
})
export class SessionSetupComponent implements OnInit {

  themes: Theme[];
  create: boolean = false;
  public myForm: FormGroup;

  constructor(private _http: Http, private _fb: FormBuilder) {
  }

  ngOnInit() {
    this._http.get(Globals.baseUrl+"/api/themes").subscribe(data => this.themes = data.json());
    this.myForm = new FormGroup({
      name: new FormControl('', [<any>Validators.required, <any>Validators.minLength(5), <any>Validators.maxLength(25)]),
      description: new FormControl('', [<any>Validators.required, <any>Validators.minLength(5), <any>Validators.maxLength(25)])
    });
  }

  ngAfterViewChecked() {
    if (this.themes != null) {
      this.themes.forEach(theme => theme.edit = false);
    }
  }
  addCard() {
    this.create = true;
  }

  cancelTheme() {
    this.create = false;
  }

  addTheme() {
    const theme = {themeId: 0, name: this.myForm.value.name, description: this.myForm.value.description};
    this._http.post(Globals.baseUrl+"/api/themes", theme).subscribe(theme => {
      this.themes.push(theme.json());
    });
    this.myForm.reset();
    this.create = false;
  }

  myEvent($event){
    console.log($event + " - hi!");
    console.log('hello');
  }
}
