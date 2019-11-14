import { Router, NavigationStart } from "@angular/router";
import { SharedService } from "./../../services/shared.service";
import { Component, OnInit, Input } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: "app-liked-users-modal",
  templateUrl: "./liked-users-modal.component.html",
  styleUrls: ["./liked-users-modal.component.css"]
})
export class LikedUsersModalComponent implements OnInit {
  @Input() public postLikedByUsers: Array<any>;
  @Input() public modalContext: string; // Modal opened for liked users or mutual friends

  constructor(
    public activeModal: NgbActiveModal,
    private _sharedService: SharedService,
    private _router: Router
  ) {}

  ngOnInit() {
    this._router.events.subscribe(val => {
      if (val instanceof NavigationStart) {
        this.activeModal.close("Route changed");
      }
    });
  }

  get noOfLikedUsers(): string {
    return this._sharedService.printArrayCount(
      this.postLikedByUsers,
      this.modalContext
    );
  }
}
