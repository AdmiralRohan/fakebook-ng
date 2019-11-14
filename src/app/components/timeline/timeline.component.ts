import { DataService } from "../../services/data.service";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-timeline",
  templateUrl: "./timeline.component.html",
  styleUrls: ["./timeline.component.css"]
})
export class TimelineComponent implements OnInit {
  public profileName: String;
  public loggedInUserId: number;
  public posts: any[];

  constructor(private _dataService: DataService) {}

  ngOnInit() {
    this.posts = [];

    if (localStorage.getItem("userDetails")) {
      const { user } = JSON.parse(localStorage.getItem("userDetails"));
      this.loggedInUserId = user.userId;
      this.profileName = user.fname + " " + user.lname;
    }

    this._dataService.fetchTimelinePosts().subscribe(res => {
      if (res.success) {
        this.posts = res.posts;
        console.log(this.posts[1]);
      }
    });
  }
}
