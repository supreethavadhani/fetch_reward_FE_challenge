import { Component, Input } from '@angular/core';
import { Dog } from '../../interfaces';

@Component({
  selector: 'app-dog-card',
  templateUrl: './dog-card.component.html',
  styleUrls: ['./dog-card.component.scss']
})
export class DogCardComponent {
  @Input() dog:Dog | undefined;
}
