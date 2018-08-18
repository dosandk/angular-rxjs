import { Component, OnInit } from "@angular/core";
import { SchedulingService } from "./scheduling.service";

interface Item {
  id: number;
  title: string;
}

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  data: Array<Item> = [];

  constructor(public schedulingService: SchedulingService) {}

  ngOnInit() {
    console.error("ngOnInit");
    this.data = [
      { id: 1, title: "foo" },
      { id: 2, title: "bar" },
      { id: 3, title: "baz" }
    ];
  }

  getItems() {
    this.schedulingService.getItems().subscribe((items: Array<Item>) => {
      console.error("getItems subscribe", items);
      this.data.push(...items);
    });
  }

  setItem() {
    this.schedulingService.setItem().subscribe((item: Item) => {
      console.error("setItem subscribe", item);
      this.data.unshift(item);
    });
  }

  deleteItem() {
    this.schedulingService.deleteItem(/*id*/).subscribe((item: Item) => {
      console.error("deleteItem subscribe", item);
      this.data = this.data.slice(1);
    });
  }
}
