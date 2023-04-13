import { TestBed, ComponentFixture } from '@angular/core/testing';
import { SessionComponent } from './session.component';
import { HttpService } from '../shared/services/httpService/http.service';
import { Router } from '@angular/router';
import { SnackbarService } from '../shared/services/snackbarService/snackbar.service';
import { of, throwError } from 'rxjs';
import { AppModule } from '../app.module';

fdescribe('SessionComponent', () => {
  let component: SessionComponent;
  let fixture: ComponentFixture<SessionComponent>;
  let httpServiceSpy: jasmine.SpyObj<HttpService>;
  let routerSpy: jasmine.SpyObj<Router>;
  let snackbarSpy: jasmine.SpyObj<SnackbarService>;

  beforeEach(async () => {
    httpServiceSpy = jasmine.createSpyObj('HttpService', ['post']);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    snackbarSpy = jasmine.createSpyObj('SnackbarService', ['showSuccess']);

    await TestBed.configureTestingModule({
      declarations: [SessionComponent],
      providers: [
        { provide: HttpService, useValue: httpServiceSpy },
        { provide: Router, useValue: routerSpy },
        { provide: SnackbarService, useValue: snackbarSpy },
      ],
      imports:[AppModule]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SessionComponent);
    component = fixture.componentInstance;
  });

  it('should call httpService.post with /auth/logout and clear sessionStorage when logout is called', () => {
    httpServiceSpy.post.and.returnValue(of({}));

    component.logout();

    expect(httpServiceSpy.post).toHaveBeenCalledWith('/auth/logout');
  });

  it('should navigate to / and call snackbar.showSuccess when logout is successful', () => {
    httpServiceSpy.post.and.returnValue(of({}));

    component.logout();

    expect(routerSpy.navigate).toHaveBeenCalledWith(['/']);
    expect(snackbarSpy.showSuccess).toHaveBeenCalledWith('Logged out Successfully');
  });

  it('should log the error to the console when logout fails', () => {
    const error = new Error('Something went wrong');
    httpServiceSpy.post.and.returnValue(throwError(error));
    spyOn(console, 'log');

    component.logout();

    expect(console.log).toHaveBeenCalledWith(error);
  });
});
