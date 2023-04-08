import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card-display-fields',
  templateUrl: './card-display-fields.component.html',
  styleUrls: ['./card-display-fields.component.scss']
})
export class CardDisplayFieldsComponent {
@Input() title:string | number= ""
@Input() value: string=""
}
