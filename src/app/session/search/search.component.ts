// Import required modules and components
import { Component, OnInit, ViewChild } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Dog } from 'src/app/shared/interfaces';
import { DataService } from 'src/app/shared/services/dataService/data.service';
import { HttpService } from 'src/app/shared/services/httpService/http.service';

// Define the component
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  // Define the component's properties
  public dogList: Dog[] = []; // List of dogs to display in the component
  totalData: any; // Total number of dogs to display

  // Inject the required services into the component
  constructor(private http: HttpService, private dataService: DataService) {}

  // Runs when the component is initialized
  ngOnInit(): void {
    // Subscribe to the filterDogs event in the DataService to get filtered dog data
    this.dataService.filterDogs.subscribe(
      (data:Dog[]) => {
        this.dogList = data;
        this.dogList.map(x => x.favorite = false);
      }
    )

    // Subscribe to the filteredResultsData event in the DataService to get total number of filtered dogs
    this.dataService.filteredResultsData.subscribe(
      (data) => {
        this.totalData = data;
      }
    )
  }

  // Function to handle page change events in the paginator component
  handlePageEvent(event: PageEvent) {
    this.dataService.setPaginatorValues(event); // Update the paginator values in the DataService
  }
}
