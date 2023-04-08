import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class DataService {
  public filterDogs = new BehaviorSubject({});
  public pickedDogs = new BehaviorSubject({});
  public filteredResultsData = new BehaviorSubject({});
  constructor() { }

  public setFilterdDogs(filterdDogs:any){
    console.log(filterdDogs)
      this.filterDogs.next(filterdDogs)
  }

  public setPickedDog(pickedDogs:any){
    this.pickedDogs.next(pickedDogs)
    console.log(this.pickedDogs)
  }

  public setFilteredResultsData(filterdResults:any){
    this.filteredResultsData.next(filterdResults.total);
  }
}
