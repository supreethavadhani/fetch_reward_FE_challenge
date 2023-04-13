import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { basePath } from '../../constants';
import { environment } from '../../../../environments/environment'
import { Router } from '@angular/router';
import { DataService } from '../dataService/data.service';
import { SnackbarService } from '../snackbarService/snackbar.service';

@Injectable({
  providedIn: 'root'
})

export class HttpService {
  // Add API key to headers
  private headers = new HttpHeaders({
    'fetch-api-key': environment.apiKey
  })

  // Define header options
  private headerOptions = {
    headers: this.headers,
    responseType: 'text' as 'json',  // Set response type as JSON
    withCredentials: true  // Set withCredentials to true to include cookies
  }
  

  constructor(private http: HttpClient, private dataService:DataService) {}

  // Send a POST request to the given endpoint with the provided data
  post(endpoint: string, data ? : any): Observable < any > {
    return this.http.post(basePath + endpoint, data, this.headerOptions);
  }

  // Send a GET request to the given endpoint with the provided data
  get(endpoint: string, data?: any): Observable < any > {
    return this.http.get(basePath + endpoint, {
      headers: this.headers,
      responseType: 'text' as 'json',  // Set response type as JSON
      withCredentials: true,  // Set withCredentials to true to include cookies
      params: data  // Add query parameters to the request
    }).pipe(
      catchError(this.handleError)
    );;
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
      // this.dataService.setAutorized(false)
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      if(error.status === 401){
        console.error(`Backend returned code ${error.status}, body was: ${error.error}`);
        this.dataService.setAutorized(false)
      }
    }
    // Return an observable with a user-facing error message.
    return throwError(error.status);
  }
}
