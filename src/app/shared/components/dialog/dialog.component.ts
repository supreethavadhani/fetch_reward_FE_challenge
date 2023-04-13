import {
  Component,
  EventEmitter,
  Inject,
  Input,
  OnInit,
  Optional,
  Output
} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogRef
} from '@angular/material/dialog';
import {
  Dog
} from '../../interfaces';
import {
  Fireworks
} from 'fireworks-js'

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent {
  @Input() public content: Dog | undefined | null;
  @Output() public closeCLicked = new EventEmitter()
  constructor(public dialogRef: MatDialogRef<DialogComponent>) { }

  close(): void {
    this.closeCLicked.next(true);
  }

}
