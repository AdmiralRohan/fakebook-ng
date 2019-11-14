import { Component, OnInit, Input } from "@angular/core";
import { SharedService } from "src/app/services/shared.service";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { LikedUsersModalComponent } from "src/app/modals/liked-users-modal/liked-users-modal.component";

@Component({
  selector: "app-friend-detail",
  templateUrl: "./friend-detail.component.html",
  styleUrls: ["./friend-detail.component.css"]
})
export class FriendDetailComponent implements OnInit {
  @Input() public friends: any[];
  @Input() public mutualFriends: any;

  constructor(
    private _sharedService: SharedService,
    private _modalService: NgbModal
  ) {}

  ngOnInit() {}

  public get noOfFriendsString(): string {
    return this._sharedService.printArrayCount(this.friends, "friend");
  }

  public noOfMutualFriends(id: number): string {
    return this._sharedService.printArrayCount(
      this.mutualFriends[id],
      "mutual friend",
      false
    );
  }

  public openMutualFriendsModal(id: number): void {
    if (this.mutualFriends[id].length === 0) {
      return;
    }

    const modalRef = this._modalService.open(LikedUsersModalComponent, {
      centered: true
    });
    modalRef.componentInstance.postLikedByUsers = this.mutualFriends[id];
    modalRef.componentInstance.modalContext = "mutual friend";
  }
}
