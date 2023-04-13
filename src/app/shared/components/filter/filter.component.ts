import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpService } from '../../services/httpService/http.service';
import { DataService } from '../../services/dataService/data.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent {
  breeds: string[] = []; // Array to store all breeds
  filteredBreeds: string[] = []; // Array to store filtered breeds based on search input
  selectedBreeds: string[] = []; // Array to store selected breeds by the user
  ageError: boolean = false; // boolean value to check if age range is invalid
  pageSize: number = 25; // number of results to display per page
  from: number = 0; // starting index of the results to display
  sortString = [ // Array to store different sorting options for the user to select from
    { name: "Breed -> A to Z", value: "breed:asc" },
    { name: "Breed -> Z to A", value: "breed:desc" },
    { name: "Name -> A to Z", value: "name:asc" },
    { name: "Name -> Z to A", value: "name:desc" },
    { name: "Age -> Ascending", value: "age:asc" },
    { name: "Age -> Descending", value: "age:desc" }
  ]

  selectedSort: string | null = "breed:asc" // The default sorting option

  filterControls = new FormGroup({ // Form group to store all filter controls
    searchControl: new FormControl(''), // Search input control
    minAgeControl: new FormControl(''), // Minimum age input control
    maxAgeControl: new FormControl(''), // Maximum age input control
    sortControl: new FormControl(''), // Sorting option control
  });

  constructor(private router: Router, private http: HttpService, private dataService: DataService) { }

  ngOnInit() {
    // Get all breeds from the server and set filteredBreeds to the same initially
    this.http.get("/dogs/breeds").subscribe(
      data => {
        this.breeds = JSON.parse(data)
        this.filteredBreeds = this.breeds;
      }
    )
    this.getSelectedBreeds()
    this.router.navigate(["session/search"]) // Navigate to search page
    this.setPaginatorValues(); // Set initial values for the paginator
  }

  // Function to handle when a breed checkbox is checked or unchecked
  checkboxChanged($event: any, breed: string) {
    if ($event.checked) {
      this.selectedBreeds.push(breed) // Add the breed to the selectedBreeds array
    } else {
      const index = this.selectedBreeds.indexOf(breed);
      this.selectedBreeds.splice(index, 1); // Remove the breed from the selectedBreeds array
    }
    this.getSelectedBreeds(); // Get filtered results based on selected breeds and filter inputs
  }

  // Function to handle when a character is typed in the search input
  inputChar($event: any) {
    this.filteredBreeds = this.breeds // Reset filteredBreeds to all breeds initially
    this.filteredBreeds = this.breeds.filter(x => x.includes(this.filterControls['controls'].searchControl.getRawValue() as string)) // Filter breeds based on search input
    this.getSelectedBreeds(); // Get filtered results based on selected breeds and filter inputs
  }
  // This function is called whenever user selects a breed or changes the age filter or sorts the results.
  // It sets ageError to false initially and then checks if the selected min age is greater than the selected max age.
  // If so, ageError is set to true.
  // It then sends an HTTP GET request to fetch dogs based on selected breeds, age filters, sorting, page size and from.
  // Once the result is obtained, it sets filtered result data and filtered dogs by sending HTTP POST requests.
  getSelectedBreeds() {
    this.ageError = false;

    // Getting selected min age and max age and checking if minAge is greater than maxAge.
    // let maxAge = this.filterControls['controls'].maxAgeControl.value! as unknown;
    // let minAge = this.filterControls['controls'].minAgeControl.value! as unknown;
    // if ((minAge != null && maxAge != null) && minAge > maxAge) {
    //   this.ageError = true;
    // }

    // Sending HTTP GET request to fetch dogs based on selected breeds, age filters, sorting, page size and from.
    this.http.get("/dogs/search", {
      breeds: this.selectedBreeds,
      ageMin: this.filterControls['controls'].minAgeControl.getRawValue(),
      ageMax: this.filterControls['controls'].maxAgeControl.getRawValue(),
      sort: this.selectedSort,
      size: this.pageSize != null ? this.pageSize : 25,
      from: this.from != null ? this.from : 0
    }).subscribe(
      data => {
        // Setting filtered result data.
        this.dataService.setFilteredResultsData(JSON.parse(data));
        // Sending HTTP POST request to get filtered dogs.
        this.http.post("/dogs", JSON.parse(data).resultIds).subscribe(
          data => {
            // Setting filtered dogs.
            this.dataService.setFilterdDogs(JSON.parse(data));
          }
        )
      },
      err => {
        console.log(err)
      }
    )
  }

  // This function is called whenever user changes the sort option.
  // It sets the selected sort value and calls getSelectedBreeds function.
  setSortValue() {
    this.selectedSort = this.filterControls['controls'].sortControl.getRawValue();
    this.getSelectedBreeds();
  }

  // This function is called whenever the page size or page number changes.
  // It gets the new page size and from values and calls getSelectedBreeds function.
  setPaginatorValues() {
    this.dataService.paginatorValues.subscribe(
      data => {
        let x = data as { size: number, from: number };
        this.pageSize = x.size;
        this.from = x.from;
        this.getSelectedBreeds();
      }
    )
  }
}