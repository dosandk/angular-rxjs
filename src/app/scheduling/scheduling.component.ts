import { Component } from '@angular/core';
import {SchedulingService} from '../scheduling.service';

@Component({
  selector: 'app-scheduling',
  templateUrl: './scheduling.component.html',
  styleUrls: ['./scheduling.component.css']
})
export class SchedulingComponent {

  constructor(
    public schedulingService: SchedulingService
  ) { }

  createItem () {
    this.schedulingService.createItem();
  }
}
