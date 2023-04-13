import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { DataService } from '../services/dataService/data.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router:Router, private dataService:DataService) { }

  canActivate(): boolean{
    if (this.dataService.getAuthStatus()) {
      return true;
    } else {
      this.router.navigate(["/"])
      return false
    }
  }
}
