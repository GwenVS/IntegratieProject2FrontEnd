import {ModuleWithProviders} from "@angular/core";
import {Routes, RouterModule} from "@angular/router";

import {AppComponent} from "./app.component";
import {LoginComponent} from "./containers/login/login.component";
import {MainComponent} from "./containers/main/main.component";
import {SessionSetupComponent} from "./components/session-setup/session-setup.component";

export const router: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'main', component: MainComponent},
  {path: 'settings', component: SessionSetupComponent},
  {path: '**', redirectTo: '/login'}
];

export const routes: ModuleWithProviders = RouterModule.forRoot(router);
