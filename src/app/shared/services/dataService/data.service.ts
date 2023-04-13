import { Injectable } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { BehaviorSubject } from 'rxjs';
import { Dog } from '../../interfaces';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  // BehaviorSubjects to hold data that needs to be shared across components
  public filterDogs = new BehaviorSubject<Array<Dog>>([]);
  public pickedDogs = new BehaviorSubject<Array<Dog>>([]);
  public filteredResultsData = new BehaviorSubject({});
  public paginatorValues = new BehaviorSubject({});
  public isAuthorized:boolean = false;

  constructor() { }

  // Function to set filtered dogs data
  public setFilterdDogs(filterdDogs:any){
    this.filterDogs.next(filterdDogs)
  }

  // Function to set picked dog data
  public setPickedDog(pickedDogs:Dog[]){
    this.pickedDogs.next(pickedDogs)
  }

  // Function to set filtered results data
  public setFilteredResultsData(filteredResults:any){
    this.filteredResultsData.next(filteredResults.total);
  }

  // Function to set paginator values
  public setPaginatorValues(pe:any){
    // Calculate updated values for paginator
    let updatedPaginatorValues = {
      size: pe.pageSize,
      from: pe.pageSize * pe.pageIndex
    }
    this.paginatorValues.next(updatedPaginatorValues);
  }

  public setAutorized(authStatus:boolean){
    this.isAuthorized = authStatus
  }
  public getAuthStatus(){
    return this.isAuthorized
  }
}
