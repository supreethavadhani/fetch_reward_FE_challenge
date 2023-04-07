import {
  Injectable
} from '@angular/core';
import {
  HttpClient,
  HttpHeaders
} from '@angular/common/http';
import {
  Observable
} from 'rxjs';
import {
  basePath
} from '../../constants';
import { environment } from '../../../../environments/environment'

@Injectable({
  providedIn: 'root'
})

export class HttpService {
  private headers = new HttpHeaders({
    'fetch-api-key': environment.apiKey
  })
  private headerOptions = {
    headers:this.headers,
    responseType: 'text' as 'json',
    withCredentials:true
  }
  

  constructor(private http: HttpClient) {}

  postLogin(endpoint: string, data ? : any): Observable < any > {
    return this.http.post(basePath + endpoint, data, this.headerOptions);
  }

  get(endpoint?: string,data?:any): Observable < any > {
    return this.http.get(basePath+endpoint,{
      headers:this.headers,
      responseType: 'text' as 'json',
      withCredentials:true,
      params:data
    });
  }
}
