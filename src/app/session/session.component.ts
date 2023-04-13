import {
  Component, OnInit
} from '@angular/core';
import { DataService } from '../shared/services/dataService/data.service';
import { Dog } from '../shared/interfaces';
import { HttpService } from '../shared/services/httpService/http.service';
import { Router } from '@angular/router';
import { SnackbarService } from '../shared/services/snackbarService/snackbar.service';

@Component({
  selector: 'app-session',
  templateUrl: './session.component.html',
  styleUrls: ['./session.component.scss']
})
export class SessionComponent{
  constructor(public httpService:HttpService, public router:Router, private snackbar:SnackbarService){}
  logout(){
    this.httpService.post('/auth/logout').subscribe(data=>{
      console.log("Logged out")
      sessionStorage.clear()
      this.router.navigate(["/"])
      this.snackbar.showSuccess("Logged out Successfully")
    },
    err=>{
      console.log(err)
    })

  }
}
