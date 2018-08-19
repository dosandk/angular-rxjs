import { Component } from '@angular/core';
import {SchedulingService} from '../scheduling.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent {
  data: any = this.schedulingService.getSchedulingJobs();

  constructor(
    public schedulingService: SchedulingService
  ) { }

  removeItem (id: number) {
    this.schedulingService.removeItem(id);
  }

}
