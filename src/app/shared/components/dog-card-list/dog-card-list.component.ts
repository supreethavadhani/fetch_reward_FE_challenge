import { Component, Input, OnInit } from '@angular/core';
import { Dog } from '../../interfaces';
import { DataService } from '../../services/dataService/data.service';

@Component({
  selector: 'app-dog-card-list',
  templateUrl: './dog-card-list.component.html',
  styleUrls: ['./dog-card-list.component.scss']
})
export class DogCardListComponent implements OnInit{
  @Input() DogList:Dog[] = [];
  public pickedDogs:Dog[] = []

  constructor(private dataService:DataService){}
  ngOnInit(){
  }

  async favoriteClicked(dog:Dog){
    if(!dog.favorite){
      dog.favorite = true
      this.pickedDogs.push(dog)
      console.log(this.pickedDogs)
      this.dataService.setPickedDog(this.pickedDogs)
    }
    else if (dog.favorite){
      dog.favorite = false
      await(this.pickedDogs = this.pickedDogs.filter(obj =>{ 
        return obj !== dog
      }));
      console.log(this.pickedDogs)
      this.dataService.setPickedDog(this.pickedDogs)
    }
  }
}
