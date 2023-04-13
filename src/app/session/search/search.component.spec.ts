import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { SearchComponent } from './search.component';
import { DataService } from 'src/app/shared/services/dataService/data.service';
import { HttpService } from 'src/app/shared/services/httpService/http.service';
import { Dog } from 'src/app/shared/interfaces';
import { PageEvent } from '@angular/material/paginator';
import { of } from 'rxjs';
import { AppModule } from 'src/app/app.module';

fdescribe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;
  let dataService: DataService;
  let httpService: HttpService;
  let filterDogsSpy: jasmine.Spy;
  let filteredResultsDataSpy: jasmine.Spy;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchComponent ],
      providers: [ DataService, HttpService ],
      imports: [ AppModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    dataService = TestBed.get(DataService);
    httpService = TestBed.get(HttpService);
    filterDogsSpy = spyOn(dataService.filterDogs, 'subscribe');
    filteredResultsDataSpy = spyOn(dataService.filteredResultsData, 'subscribe');
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should handle page events', () => {
    const pageEvent = new PageEvent();
    pageEvent.pageSize = 10;
    pageEvent.pageIndex = 0;
    const paginatorSpy = spyOn(dataService, 'setPaginatorValues');
    component.handlePageEvent(pageEvent);
    expect(paginatorSpy).toHaveBeenCalled();
  });

  it('should get filtered dog data from DataService', () => {
    const dogList = [{ id: '1', name: 'Fido', age: 5, zip_code: '12345', breed: 'Labrador', img: 'test.png' }];
    filterDogsSpy.and.returnValue(of(dogList).subscribe());
    dataService.filterDogs.subscribe((data) => {
      expect(component.dogList).toEqual(dogList);
    });
  });

  it('should get total number of filtered dogs from DataService', () => {
    const filteredResults = [{ id: '1', name: 'Fido', age: 5, zip_code: '12345', breed: 'Labrador', img: 'test.png' }];
    filteredResultsDataSpy.and.returnValue(of(filteredResults).subscribe());
    dataService.filteredResultsData.subscribe((data) => {
      expect(component.totalData).toEqual(filteredResults);
    });
  });
});