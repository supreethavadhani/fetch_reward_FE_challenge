import { Component, OnInit } from '@angular/core';
import { EmailValidator, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { loginModel } from 'src/app/shared/models/login.model';
import { DataService } from 'src/app/shared/services/dataService/data.service';
import { HttpService } from 'src/app/shared/services/httpService/http.service';
import { SnackbarService } from 'src/app/shared/services/snackbarService/snackbar.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private fb: FormBuilder, private http:HttpService, public router: Router, private dataService:DataService, private snackbar:SnackbarService) {}

  ngOnInit(): void {}

  // create the login form with FormBuilder
  public loginForm = this.fb.group(loginModel);

  onSubmit() {
    // mark all form controls as touched to display validation errors
    this.loginForm.markAllAsTouched();

    // check if the form is invalid
    if (this.loginForm.invalid) {
      console.log("Invalid Form");
    }
    else {
      // submit the login data to the server and navigate to the session page on success
      this.http.post("/auth/login",this.loginForm.getRawValue()).subscribe(
        data=>{
          this.router.navigate(['session']);
          this.dataService.setAutorized(true);
          this.snackbar.showSuccess("Welcome User! Your best friend awaits!")
        },
        err=>{
          console.log(err);
        }
      );
    }
  }
}
