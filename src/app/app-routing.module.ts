import {
  NgModule
} from '@angular/core';
import {
  RouterModule,
  Routes
} from '@angular/router';
import {
  LoginComponent
} from './non-session/login/login.component';
import {
  SessionComponent
} from './session/session.component';
import {
  SearchComponent
} from './session/search/search.component';
import { AuthService } from "./shared/auth/auth.service"

const routes: Routes = [{
    'path': 'login',
    component: LoginComponent,
    canActivate: [AuthService] 
  },
  {
    'path': '',
    component: LoginComponent
  },
  {
    'path': 'session',
    component: SessionComponent,
    children: [{
      path: 'search',
      component: SearchComponent,
      canActivate: [AuthService] 
    }],
    canActivate: [AuthService] 
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
