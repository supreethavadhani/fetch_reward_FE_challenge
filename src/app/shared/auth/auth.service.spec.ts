import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { DataService } from '../services/dataService/data.service';

fdescribe('AuthService', () => {
  let authService: AuthService;
  let routerSpy: jasmine.SpyObj<Router>;
  let dataServiceSpy: jasmine.SpyObj<DataService>;

  beforeEach(() => {
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    dataServiceSpy = jasmine.createSpyObj('DataService', ['getAuthStatus']);
    authService = new AuthService(routerSpy, dataServiceSpy);
  });

  it('should allow access when user is authorized', () => {
    dataServiceSpy.getAuthStatus.and.returnValue(true);
    expect(authService.canActivate()).toBe(true);
    expect(routerSpy.navigate).not.toHaveBeenCalled();
  });

  it('should deny access and redirect to home page when user is not authorized', () => {
    dataServiceSpy.getAuthStatus.and.returnValue(false);
    expect(authService.canActivate()).toBe(false);
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/']);
  });
});
