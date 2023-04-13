import {Injectable} from "@angular/core";
import { MatSnackBar, MatSnackBarConfig } from "@angular/material/snack-bar";
@Injectable({ providedIn: 'root' })
export class SnackbarService {
   constructor(private snackBar: MatSnackBar) {}

   showSuccess(message: string) {
    const config = new MatSnackBarConfig();
    config.panelClass = ['snackbar-success'];
    config.duration = 3000;
    this.snackBar.open(message, undefined, config);
 }
   close(){
      this.snackBar.dismiss();
   }
}
