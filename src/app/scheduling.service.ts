import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError, map} from 'rxjs/operators';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Injectable()
export class SchedulingService {
  schedulingJobs$: BehaviorSubject = new BehaviorSubject([]);

  constructor(
    public http: HttpClient,
  ) {
    this.getItems();
  }

  getSchedulingJobs () {
    return this.schedulingJobs$;
  }

  getItems () {
    this.http.get('http://jsonplaceholder.typicode.com/posts/')
      .pipe(
        catchError(this.errorHandler)
      )
      .subscribe(items => {
        this.schedulingJobs$.next(items);
      });
  }

  createItem () {
    const body = JSON.stringify({
      title: 'some ver1y long text',
      body: 'bar',
      id: Date.now()
    });

    const headers = this.getHeaders();

    return this.http.post('https://jsonplaceholder.typicode.com/posts', body, headers)
      .pipe(
        catchError(this.errorHandler)
      )
      .subscribe(item => {
        const value = this.schedulingJobs$.value;

        this.schedulingJobs$.next([item, ...value]);
      });
  }

  removeItem (id: number) {
    this.http.delete(`https://jsonplaceholder.typicode.com/posts/${id}`)
      .pipe (
        map(() => ({id})),
        catchError(this.errorHandler)
      )
      .subscribe(item => {
        const result = this.schedulingJobs$.value.filter(job => job.id !== item.id);

        this.schedulingJobs$.next(result);
      });
  }

  errorHandler (err, caught) {
    console.error('err', err);
    console.error('caught', caught);
    // TODO: show toast-message!
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
