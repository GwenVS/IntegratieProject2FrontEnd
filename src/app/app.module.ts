import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import {SignupFormComponent} from "./components/signup-form/signup-form.component";
import {FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {NavigationBarComponent} from "./components/navigation-bar/navigation-bar.component";
import {LoginFormComponent} from "./components/login-form/login-form.component";
import {FormComponent} from "./components/form/form.component";
import {HttpLoginServiceService} from "./services/http-login-service.service";
import {HttpClient, HttpClientJsonpModule, HttpClientModule} from '@angular/common/http';
import { MainComponent } from './containers/main/main.component';
import { LoginComponent } from './containers/login/login.component';
import {AppRoutingModule} from './app-routing.module';
import { ProfileComponent } from './components/profile/profile.component';
import { SessionComponent } from './components/session/session.component';
import {TOKEN_NAME} from './services/auth.constant';
import {AuthConfig, AuthHttp} from 'angular2-jwt';
import {Http, HttpModule, RequestOptions} from '@angular/http';
import {AuthService} from './services/auth.service';
import {UserService} from './services/user.service';
import {AppDataService} from './services/app-data.service';
import { ImageUploadComponent } from './components/image-upload/image-upload.component';
import { GameSessionComponent } from './components/game-session/game-session.component';
import { CreateGameSessionComponent } from './components/create-game-session/create-game-session.component';
import { GameSessionSettingsComponent } from './components/game-session-settings/game-session-settings.component';
import { routes } from './app.router';
import { GameSessionEditComponent } from './components/game-session-edit/game-session-edit.component';
import { ListViewComponent } from './components/list-view/list-view.component';
import {ChatComponent} from './components/chat/chat.component';
import {CompleterService, Ng2CompleterModule} from "ng2-completer";
import { SharebuttonsComponent } from './components/sharebuttons/sharebuttons.component';
//import { UpdatePasswordComponent } from './components/update-password/update-password.component';
import { ShareButtonsModule } from '@ngx-share/buttons';
import { NgLoadingSpinnerModule, NgLoadingSpinnerInterceptor } from 'ng-loading-spinner';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { CreateMainThemeComponent } from './components/create-main-theme/create-main-theme.component';
import { MainThemesComponent } from './components/main-themes/main-themes.component';
import {CardComponent} from "./components/card/card.component";
import {SessionSetupComponent} from "./components/session-setup/session-setup.component";


export function authHttpServiceFactory(http: Http, options: RequestOptions) {
  return new AuthHttp(new AuthConfig({
    tokenName: TOKEN_NAME,
    tokenGetter: (() => 'eyJhbGciOiJIUzUxMiJ9.eyJpc3MiOiJLYW5kb2UiLCJzdWIiOiJzdmVuZW1hbiIsImF1ZCI6IndlYiIsImlhdCI6MTUxOTM4MzQyNywiZXhwIjoxNTE5Mzg3MDI3fQ.ACdBoEeppBPfWYv6k4ouwEmGzaCS9sRzF4SiDb9Dtpohb50n_Z4kidqRncL3hKjVK37JJWxPVLLOGgJgE-IYjw'),
    globalHeaders: [{'Content-Type': 'application/json'}],
  }), http, options);
}

@NgModule({
  declarations: [
    AppComponent,
    SignupFormComponent,
    NavigationBarComponent,
    LoginFormComponent,
    FormComponent,
    MainComponent,
    LoginComponent,
    ProfileComponent,
    SessionComponent,
    ImageUploadComponent,
    GameSessionComponent,
    CreateGameSessionComponent,
    GameSessionSettingsComponent,
    GameSessionEditComponent,
    SharebuttonsComponent,
    //UpdatePasswordComponent,
    ListViewComponent,
    CreateMainThemeComponent,
    MainThemesComponent,
    CardComponent,
    SessionSetupComponent
    ChatComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    HttpClientJsonpModule,  // for linkedin and tumblr share counts
    ShareButtonsModule.forRoot(),
    AppRoutingModule,
    HttpModule,
    Ng2CompleterModule,
    routes,
    HttpClientModule,
    NgLoadingSpinnerModule,
  ],
  providers: [
    {provide: AuthHttp, useFactory: authHttpServiceFactory, deps: [Http]},
    AuthService,
    UserService,
    HttpLoginServiceService,
    AppDataService,
    Ng2CompleterModule,
    CompleterService,
    { provide: HTTP_INTERCEPTORS, useClass: NgLoadingSpinnerInterceptor, multi: true }

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
