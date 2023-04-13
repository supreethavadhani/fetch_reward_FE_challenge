import { Dog } from '../../interfaces';
import { DataService } from './data.service';

fdescribe('DataService', () => {
  let service: DataService;

  beforeEach(() => {
    service = new DataService();
  });

  it('should create the service', () => {
    expect(service).toBeTruthy();
  });

  describe('filterDogs', () => {
    it('should set and get filtered dogs', () => {
      const filteredDogs: Dog[] = [{ id: '1', img: 'dog1.jpg', name: 'Buddy', age: 3, zip_code: '12345', breed: 'Golden Retriever' }];
      service.setFilterdDogs(filteredDogs);
      expect(service.filterDogs.value).toEqual(filteredDogs);
    });
  });

  describe('pickedDogs', () => {
    it('should set and get picked dogs', () => {
      const pickedDogs: Dog[] = [{ id: '1', img: 'dog1.jpg', name: 'Buddy', age: 3, zip_code: '12345', breed: 'Golden Retriever' }];
      service.setPickedDog(pickedDogs);
      expect(service.pickedDogs.value).toEqual(pickedDogs);
    });
  });

  describe('filteredResultsData', () => {
    it('should set and get filtered results data', () => {
      const filteredResultsData = { total: 10 };
      service.setFilteredResultsData(filteredResultsData);
      expect(service.filteredResultsData.value).toEqual(filteredResultsData.total);
    });
  });

  describe('paginatorValues', () => {
    it('should set and get paginator values', () => {
      const paginatorValues = { size: 10, from: 20 };
      service.setPaginatorValues({ pageSize: paginatorValues.size, pageIndex: paginatorValues.from / paginatorValues.size });
      expect(service.paginatorValues.value).toEqual(paginatorValues);
    });
  });

  describe('isAuthorized', () => {
    it('should set and get authorization status', () => {
      const authStatus = true;
      service.setAutorized(authStatus);
      expect(service.getAuthStatus()).toEqual(authStatus);
    });
  });
});