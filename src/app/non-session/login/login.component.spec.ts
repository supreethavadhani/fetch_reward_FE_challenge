import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpService } from 'src/app/shared/services/http.service';
import { of } from 'rxjs';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let fb: FormBuilder;
  let httpServiceSpy: jasmine.SpyObj<HttpService>;

  beforeEach(async () => {
    const httpSpy = jasmine.createSpyObj('HttpService', ['postLogin']);
    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports:[ReactiveFormsModule,MaterialModule,BrowserAnimationsModule,FormsModule],
      providers: [
        FormBuilder,
        { provide: HttpService, useValue: httpSpy },
      ],
    }).compileComponents();
    fb = TestBed.inject(FormBuilder);
    httpServiceSpy = TestBed.inject(HttpService) as jasmine.SpyObj<HttpService>;
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call http.postLogin when form is submitted with valid inputs', () => {
    // arrange
    const loginForm = fb.group({
      name: ['Adam', Validators.required],
      email: ['adam@gmail.com', [Validators.required, Validators.email]],
    });
    httpServiceSpy.postLogin.and.returnValue(of({}));
    component.loginForm = loginForm;
    fixture.detectChanges();

    // act
    component.onSubmit();

    // assert
    expect(httpServiceSpy.postLogin).toHaveBeenCalledWith('/auth/login', loginForm.getRawValue());
  });

  it('should not call http.postLogin when form is submitted with invalid inputs', () => {
    // arrange
    const loginForm = fb.group({
      name: ['Eve', Validators.required],
      email: ['invalid-email', [Validators.required, Validators.email]],
    });
    component.loginForm = loginForm;
    fixture.detectChanges();

    // act
    component.onSubmit();

    // assert
    expect(httpServiceSpy.postLogin).not.toHaveBeenCalled();
  });

  it('should mark all form fields as touched when form is submitted', () => {
    // arrange
    const loginForm = fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
    });
    component.loginForm = loginForm;
    fixture.detectChanges();

    // act
    component.onSubmit();

    // assert
    expect(loginForm.get('name')?.touched).toBeTrue();
    expect(loginForm.get('email')?.touched).toBeTrue();
  });


});
