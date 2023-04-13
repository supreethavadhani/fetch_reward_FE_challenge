import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Dog } from '../../interfaces';

@Component({
  selector: 'app-fav-cards',
  templateUrl: './fav-cards.component.html',
  styleUrls: ['./fav-cards.component.scss']
})
export class FavCardsComponent {
  @Input() dog: Dog | undefined;

}
