import { TestBed } from '@angular/core/testing';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarService } from './snackbar.service';

fdescribe('SnackbarService', () => {
  let service: SnackbarService;
  let snackBarSpy: jasmine.SpyObj<MatSnackBar>;

  beforeEach(() => {
    snackBarSpy = jasmine.createSpyObj('MatSnackBar', ['open', 'dismiss']);
    TestBed.configureTestingModule({
      providers: [
        { provide: MatSnackBar, useValue: snackBarSpy }
      ]
    });
    service = TestBed.inject(SnackbarService);
  });

  it('should show success message', () => {
    const message = 'Success message';
    service.showSuccess(message);
    expect(snackBarSpy.open).toHaveBeenCalledWith(message, undefined, jasmine.any(Object));
  });
  it('should close snackbar', () => {
    service.close();
    expect(snackBarSpy.dismiss).toHaveBeenCalled();
  });
});