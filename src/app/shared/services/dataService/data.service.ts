import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class DataService {
  public filterDogs = new BehaviorSubject({});
  constructor() { }

  public setFilterdDogs(filterdDogs:any){
    console.log(filterdDogs)
      this.filterDogs.next(filterdDogs)
  }
}
