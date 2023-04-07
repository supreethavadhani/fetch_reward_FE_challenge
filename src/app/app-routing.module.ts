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


const routes: Routes = [{
    'path': 'login',
    component: LoginComponent
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
      component: SearchComponent
    }]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
