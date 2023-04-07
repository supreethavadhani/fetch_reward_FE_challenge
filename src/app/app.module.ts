import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './non-session/login/login.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './shared/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MainCardComponent } from './shared/components/main-card/main-card.component';
import { SessionComponent } from './session/session.component';
import { SearchComponent } from './session/search/search.component';
import { TableComponentComponent } from './shared/components/table-component/table-component.component';
import { DogCardComponent } from './shared/components/dog-card/dog-card.component';
import { DogCardListComponent } from './shared/components/dog-card-list/dog-card-list.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MainCardComponent,
    SessionComponent,
    SearchComponent,
    TableComponentComponent,
    DogCardComponent,
    DogCardListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
