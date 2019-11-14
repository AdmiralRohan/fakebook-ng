import { DataService } from "./../../services/data.service";
import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-friendship-button",
  templateUrl: "./friendship-button.component.html",
  styleUrls: ["./friendship-button.component.css"]
})
export class FriendshipButtonComponent implements OnInit {
  @Input("friendshipStatus") public friendshipStatusCode: number;
  @Input("profileId") private _profileId: number;

  public isButtonLoading: boolean;

  constructor(private _dataService: DataService) {}

  ngOnInit() {
    this.isButtonLoading = false;
  }

  public addFriend() {
    this.isButtonLoading = true;
    this._dataService.addFriend(this._profileId).subscribe(res => {
      if (res.success) {
        this.friendshipStatusCode = res.friendshipStatus;
        this.isButtonLoading = false;
      }
    });
  }

  public cancelRequest() {
    this.isButtonLoading = true;
    this._dataService.cancelRequest(this._profileId).subscribe(res => {
      if (res.success) {
        this.friendshipStatusCode = res.friendshipStatus;
        this.isButtonLoading = false;
      }
    });
  }

  public confirmRequest() {
    this.isButtonLoading = true;
    this._dataService.confirmRequest(this._profileId).subscribe(res => {
      if (res.success) {
        this.friendshipStatusCode = res.friendshipStatus;
        this.isButtonLoading = false;
      }
    });
  }

  public deleteRequest() {
    this.isButtonLoading = true;
    this._dataService.deleteRequest(this._profileId).subscribe(res => {
      if (res.success) {
        this.friendshipStatusCode = res.friendshipStatus;
        this.isButtonLoading = false;
      }
    });
  }

  public unfriend() {
    this.isButtonLoading = true;
    this._dataService.unfriend(this._profileId).subscribe(res => {
      if (res.success) {
        this.friendshipStatusCode = res.friendshipStatus;
        this.isButtonLoading = false;
      }
    });
  }
}
