import {
  Component,
  OnInit
} from '@angular/core';
import {
  EmailValidator,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import { Router } from '@angular/router';
import { loginModel } from 'src/app/shared/models/login.model';
import { HttpService } from 'src/app/shared/services/httpService/http.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private fb: FormBuilder, private http:HttpService, private router: Router) {}
  ngOnInit(): void {}

  public loginForm = this.fb.group(loginModel);

  onSubmit() {
    this.loginForm.markAllAsTouched();
    if (this.loginForm.invalid) {
      console.log("Invalid Form")
    }
    else {
      this.http.postLogin("/auth/login",this.loginForm.getRawValue()).subscribe(
        data=>{
          this.router.navigate(['session'])
        },
        err=>{
          console.log(err);
        });
    }
  }
}
