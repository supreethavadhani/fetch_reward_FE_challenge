import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { LoginComponent } from './login.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { DataService } from 'src/app/shared/services/dataService/data.service';
import { HttpService } from 'src/app/shared/services/httpService/http.service';
import { SnackbarService } from 'src/app/shared/services/snackbarService/snackbar.service';
import { AppModule } from 'src/app/app.module';
import { Observable } from 'rxjs';

fdescribe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let dataService: DataService;
  let httpService: HttpService;
  let snackbarService: SnackbarService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule, ReactiveFormsModule, AppModule],
      declarations: [LoginComponent],
      providers: [FormBuilder, DataService, HttpService, SnackbarService]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    dataService = TestBed.inject(DataService);
    httpService = TestBed.inject(HttpService);
    snackbarService = TestBed.inject(SnackbarService);
    component.ngOnInit
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should mark all form controls as touched when onSubmit() is called', () => {
    spyOn(component.loginForm, 'markAllAsTouched');
    component.onSubmit();
    expect(component.loginForm.markAllAsTouched).toHaveBeenCalled();
  });

  it('should submit the form if it is valid', () => {
    spyOn(httpService, 'post').and.callThrough();
    component.loginForm.setValue({ name: 'test', email: 'test@test.com' });
    component.onSubmit();
    expect(httpService.post).toHaveBeenCalledWith('/auth/login', { name: 'test', email: 'test@test.com' });
  });

  it('should not submit the form if it is not valid', () => {
    spyOn(httpService, 'post').and.callThrough();
    component.loginForm.setValue({ name: 'test', email: 'testtest.com' });
    component.onSubmit();
    expect(httpService.post).not.toHaveBeenCalled();
  });

  it('should log the error message when the server returns an error', () => {
    spyOn(httpService, 'post').and.returnValue(new Observable<any>(observer => {
      observer.error('Error');
    }));
    spyOn(console, 'log');
    component.loginForm.setValue({ name: 'test', email: 'test@test.com' });
    component.onSubmit();
    expect(console.log).toHaveBeenCalledWith('Error');
  });
});
