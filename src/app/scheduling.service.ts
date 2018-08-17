import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError} from 'rxjs/operators';

@Injectable()
export class SchedulingService {
  constructor(
    public http: HttpClient,
  ) { }

  getItems () {
    console.error('download');

    return this.http.get('http://jsonplaceholder.typicode.com/posts/')
      .pipe(catchError(this.errorHandler));
  }

  setItem () {
    const body = JSON.stringify({
      title: 'some very long text',
      body: 'bar',
      userId: 1
    });

    const headers = this.getHeaders();

    return this.http.post('https://jsonplaceholder.typicode.com/posts', body, headers)
      .pipe(catchError(this.errorHandler));
  }

  deleteItem (/*id: number*/) {
    return this.http.delete(`https://jsonplaceholder.typicode.com/posts/1`)
      .pipe(catchError(this.errorHandler));
  }

  errorHandler (err, caught) {
    console.error('err', err);
    console.error('caught', caught);
    return err;
  }

  private getHeaders() {
    return {
      headers: new HttpHeaders({
        'Content-type': 'application/json; charset=UTF-8'
      })
    };
  }
}
