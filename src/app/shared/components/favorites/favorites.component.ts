import {
  Component
} from '@angular/core';
import {
  Dog
} from '../../interfaces';
import {
  DataService
} from '../../services/dataService/data.service';
import {
  HttpService
} from '../../services/httpService/http.service';
import { Dialog } from '@angular/cdk/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { MatDialogConfig } from '@angular/material/dialog';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent {
  public pickedDogs: Dog[] = [];
  public pickedLength: number = 0;
  public filteredData: Dog[] = [];
  public matchedDog: Dog | undefined;

  constructor(private dataService: DataService, private http: HttpService, private dialog:Dialog) {
    this.pickedLength = 0
  }

  ngOnInit(): void {
    this.pickedLength = 0
    this.dataService.pickedDogs.subscribe(
      data => {
        this.pickedDogs = data as Dog[]
        this.pickedLength = this.pickedDogs.length
      }
    )
  }

  match() {
    let pickedDogIds = this.pickedDogs.map(x => x.id)
    this.http.post("/dogs/match", pickedDogIds).subscribe(
     async data => {
        await (this.matchedDog = this.pickedDogs.filter(x => x.id = data.match)[0])
        this.openDialog()
      }
    )
  }

  openDialog(): void {
    let dialogRef = this.dialog.open(DialogComponent);
    if(dialogRef.componentInstance)
      dialogRef.componentInstance.content = this.matchedDog;
    dialogRef.componentInstance?.closeCLicked.subscribe(
      data=>{
        dialogRef.close()
      }
    )
}
}
