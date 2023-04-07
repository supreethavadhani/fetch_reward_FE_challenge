import {
  Component
} from '@angular/core';
import {
  Route,
  Router
} from '@angular/router';
import {
  HttpService
} from '../shared/services/httpService/http.service';
import {
  FormControl
} from '@angular/forms';
import { DataService } from '../shared/services/dataService/data.service';

@Component({
  selector: 'app-session',
  templateUrl: './session.component.html',
  styleUrls: ['./session.component.scss']
})
export class SessionComponent {
  breeds: string[] = []
  filteredBreeds: string[] = [];
  selectedBreeds: string[] = [];

  searchControl = new FormControl('');
  constructor(private router: Router, private http: HttpService, private dataService:DataService) {
    this.http.get("/dogs/breeds").subscribe(
      data => {
        this.breeds = JSON.parse(data)
      }
    )
    this.setFilteredBreeds()
    this.router.navigate(["session/search"])
  }

  inputChar($event: any) {
    this.filteredBreeds = this.breeds
    this.filteredBreeds = this.breeds.filter(x => x.includes(this.searchControl.getRawValue() as string))
  }

  checkboxChanged($event: any, breed: string) {
    if ($event.checked) {
      this.selectedBreeds.push(breed)
    } else {
      const index = this.selectedBreeds.indexOf(breed);
        this.selectedBreeds.splice(index, 1); 
    }
    this.setFilteredBreeds();
  }

  setFilteredBreeds(){
    console.log(this.selectedBreeds)
    this.http.get("/dogs/search",{ breeds:this.selectedBreeds }).subscribe(
      data=>{
        console.log(data)
        this.http.postLogin("/dogs",JSON.parse(data).resultIds).subscribe(
          data=>{
            this.dataService.setFilterdDogs(JSON.parse(data));
          }
        )
      }
    )
  }

}
