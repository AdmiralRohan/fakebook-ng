import { SharedService } from "./../../services/shared.service";
import { ActivatedRoute, Router } from "@angular/router";
import { DataService } from "../../services/data.service";
import { Component, OnInit } from "@angular/core";
import { LikedUsersModalComponent } from "src/app/modals/liked-users-modal/liked-users-modal.component";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap/modal/modal.module";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.css"]
})
export class ProfileComponent implements OnInit {
  public profileId: number;
  public loggedInUserId: number;
  public posts: any[];
  public profileName: string;
  public friendshipStatus: number;
  public mutualFriends: any[];

  constructor(
    private _dataService: DataService,
    private _sharedService: SharedService,
    private _modalService: NgbModal,
    private _route: ActivatedRoute,
    private _router: Router
  ) {}

  ngOnInit() {
    this.posts = [];
    this.profileName = "";
    this.friendshipStatus = 0;
    this.mutualFriends = [];

    if (localStorage.getItem("userDetails")) {
      this.loggedInUserId = JSON.parse(
        localStorage.getItem("userDetails")
      ).user.userId;
    }

    this._route.params.subscribe(params => {
      this.profileId = params.profileId
        ? params.profileId
        : this.loggedInUserId;
      console.log("Profile ID", this.profileId);

      this._dataService.fetchPostsByProfileId(this.profileId).subscribe(res => {
        if (res.success) {
          this.posts = res.posts;
          this.profileName = res.userName;
          this.friendshipStatus = res.friendshipStatus;
          this.mutualFriends = res.mutualFriends;
        } else {
          this._router.navigate(["/404"]);
        }
      });
    });
  }

  public get isOwnProfile(): boolean {
    return this.loggedInUserId == this.profileId;
  }

  public get noOfMutualFriends(): string {
    return this._sharedService.printArrayCount(
      this.mutualFriends,
      "mutual friend",
      false
    );
  }

  public openMutualFriendsModal() {
    if (this.mutualFriends.length === 0) {
      return;
    }

    const modalRef = this._modalService.open(LikedUsersModalComponent, {
      centered: true
    });
    modalRef.componentInstance.postLikedByUsers = this.mutualFriends;
    modalRef.componentInstance.modalContext = "mutual friend";
  }
}
