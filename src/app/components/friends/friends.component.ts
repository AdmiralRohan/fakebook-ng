import { Component, OnInit } from "@angular/core";
import { NgbTabChangeEvent } from "@ng-bootstrap/ng-bootstrap";
import { DataService } from "./../../services/data.service";

@Component({
  selector: "app-friends",
  templateUrl: "./friends.component.html",
  styleUrls: ["./friends.component.css"]
})
export class FriendsComponent implements OnInit {
  public friends: any[];
  public mutualFriends: any;
  public loggedInUserId: string;
  public profileName: string;
  public currentTab: string;

  constructor(private _dataService: DataService) {}

  ngOnInit() {
    this.friends = [];
    this.mutualFriends = {};
    this.currentTab = "friends";

    if (localStorage.getItem("userDetails")) {
      const { user } = JSON.parse(localStorage.getItem("userDetails"));
      this.loggedInUserId = user.userId;
      this.profileName = user.fname + " " + user.lname;
    }

    this._fetchList();
  }

  private _fetchList(): void {
    switch (this.currentTab) {
      case "friends":
        this._dataService.fetchFriendList().subscribe(res => {
          if (res.success) {
            this.friends = res.friends;
            this.mutualFriends = res.mutualFriends;
          }
        });
        break;

      case "received":
        this._dataService.fetchReceivedFriendRequests().subscribe(res => {
          if (res.success) {
            this.friends = res.friends;
            this.mutualFriends = res.mutualFriends;
          }
        });
        break;

      case "sent":
        this._dataService.fetchSentFriendRequests().subscribe(res => {
          if (res.success) {
            this.friends = res.friends;
            this.mutualFriends = res.mutualFriends;
          }
        });
        break;

      default:
        break;
    }
  }

  public onTabChange(event: NgbTabChangeEvent): void {
    this.currentTab = event.nextId;
    this._fetchList();
  }
}
