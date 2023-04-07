import { Component, Input } from '@angular/core';
import { Dog } from '../../interfaces';

@Component({
  selector: 'app-dog-card-list',
  templateUrl: './dog-card-list.component.html',
  styleUrls: ['./dog-card-list.component.scss']
})
export class DogCardListComponent {
  @Input() DogList:Dog[] = [];
}
