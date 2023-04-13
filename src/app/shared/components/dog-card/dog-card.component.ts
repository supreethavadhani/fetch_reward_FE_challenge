import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Dog } from '../../interfaces';
import { DataService } from '../../services/dataService/data.service';

@Component({
  selector: 'app-dog-card',
  templateUrl: './dog-card.component.html',
  styleUrls: ['./dog-card.component.scss']
})
export class DogCardComponent {
  @Input() dog:Dog | undefined;
  @Output() favoriteClicked = new EventEmitter()

  constructor(){}

  favoriteToggle(){
    this.favoriteClicked.next(true)
  }
}
