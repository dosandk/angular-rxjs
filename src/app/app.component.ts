import {Component, OnInit} from '@angular/core';
import {SchedulingService} from './scheduling.service';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  private stream$: BehaviorSubject<Array<Object>> = new BehaviorSubject<Array<Object>>([]);

  constructor (
    public schedulingService: SchedulingService,
    public http: HttpClient,
  ) {}

  ngOnInit () {
    console.error('ngOnInit', this.stream$);

    this.stream$.subscribe(item => {
      console.error('Subscription', item);
    });
  }

  download () {
    console.error('download');

    this.http.get('http://jsonplaceholder.typicode.com/posts/')
      .toPromise().then((data: Array<Object>) => {
        this.stream$.next(data);
      });
  }

  getStream () {
    return this.stream$;
  }
}
