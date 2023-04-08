import {
  Component
} from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl, FormGroup, ValidationErrors, ValidatorFn
} from '@angular/forms';
import {
  Router
} from '@angular/router';
import {
  HttpService
} from '../../services/httpService/http.service';
import {
  DataService
} from '../../services/dataService/data.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent {
  breeds: string[] = []
  filteredBreeds: string[] = [];
  selectedBreeds: string[] = [];
  ageError:boolean = false;

  filterControls = new FormGroup({
    searchControl: new FormControl(''),
    minAgeControl: new FormControl(''),
    maxAgeControl: new FormControl('')
  });

  constructor(private router: Router, private http: HttpService, private dataService: DataService) {}

  ngOnInit() {
    this.http.get("/dogs/breeds").subscribe(
      data => {
        this.breeds = JSON.parse(data)
        this.filteredBreeds = this.breeds;
      }
    )
    this.getSelectedBreeds()
    this.router.navigate(["session/search"])
  }

  checkboxChanged($event: any, breed: string) {
    if ($event.checked) {
      this.selectedBreeds.push(breed)
    } else {
      const index = this.selectedBreeds.indexOf(breed);
      this.selectedBreeds.splice(index, 1);
    }
    this.getSelectedBreeds();
  }

  inputChar($event: any) {
    this.filteredBreeds = this.breeds
    this.filteredBreeds = this.breeds.filter(x => x.includes(this.filterControls['controls'].searchControl.getRawValue() as string))
  }

  getSelectedBreeds() {
    this.ageError = false
    let maxAge = this.filterControls['controls'].maxAgeControl.value! as unknown;
    let minAge = this.filterControls['controls'].minAgeControl.value! as unknown;
    if ( (minAge!=null && maxAge !=null) && minAge>maxAge  ) {
      this.ageError = true
    }
    this.http.get("/dogs/search", {
      breeds: this.selectedBreeds,
      ageMin: this.filterControls['controls'].minAgeControl.getRawValue(),
      ageMax: this.filterControls['controls'].maxAgeControl.getRawValue(),
    }).subscribe(
      data => {
        this.dataService.setFilteredResultsData(JSON.parse(data));
        this.http.postLogin("/dogs", JSON.parse(data).resultIds).subscribe(
          data => {
            this.dataService.setFilterdDogs(JSON.parse(data));
          }
        )
      }
    )
  }

}