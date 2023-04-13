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
import { SessionComponent } from './session/session.component';
import { SearchComponent } from './session/search/search.component';
import { DogCardComponent } from './shared/components/dog-card/dog-card.component';
import { DogCardListComponent } from './shared/components/dog-card-list/dog-card-list.component';
import { FilterComponent } from './shared/components/filter/filter.component';
import { FavCardsComponent } from './shared/components/fav-cards/fav-cards.component';
import { FavoritesComponent } from './shared/components/favorites/favorites.component';
import { DialogComponent } from './shared/components/dialog/dialog.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {Dog} from './shared/interfaces';
import { AuthService } from './shared/auth/auth.service';
import { DataService } from './shared/services/dataService/data.service';
import { SnackbarService } from './shared/services/snackbarService/snackbar.service';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SessionComponent,
    SearchComponent,
    DogCardComponent,
    DogCardListComponent,
    FilterComponent,
    FavCardsComponent,
    FavoritesComponent,
    DialogComponent,
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
  providers: [
    AuthService,
    DataService,
    SnackbarService,
    {
      provide: MatDialogRef,
      useValue: {}
    },
    DialogComponent
 ],
  bootstrap: [AppComponent]
})
export class AppModule { }
