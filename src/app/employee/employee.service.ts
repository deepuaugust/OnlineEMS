import {
  Injectable
} from '@angular/core';
import {
  HttpClient
} from '@angular/common/http';

import {
  Observable,
  throwError
} from 'rxjs';
import {
  map,
  tap,
  catchError
} from 'rxjs/operators';

import {
  Employee
} from './employee';

@Injectable()
export class EmployeeService {
  private _employeeUrl = './assets/api/employees.json';
  data = {};

  constructor(private _http: HttpClient) {}

  getActivities(): Observable < Employee[] > {
    return this._http.get < Employee[] > (this._employeeUrl);
  }

  private handleError(err) {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    let errorMessage = '';
    if (err.error instanceof Error) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }

}
