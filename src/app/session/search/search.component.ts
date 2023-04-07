import { Component, OnInit, ViewChild } from '@angular/core';
import { TableComponentComponent, TableMetaData } from 'src/app/shared/components/table-component/table-component.component';
import { Dog } from 'src/app/shared/interfaces';
import { DataService } from 'src/app/shared/services/dataService/data.service';
import { HttpService } from 'src/app/shared/services/httpService/http.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit{
  @ViewChild("gridTable", { static: false }) gtable: TableComponentComponent | undefined;
  public dogList:Dog[] = [];
  constructor(private http:HttpService, private dataService:DataService){}
  
  ngOnInit(): void {
    this.dataService.filterDogs.subscribe(
      data=>{
        this.dogList = data as Dog[]
      }
    )
    }

}
