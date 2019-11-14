import {
  Component,
  OnInit,
  Input,
  ViewChild,
  ElementRef,
  Output,
  EventEmitter
} from "@angular/core";
import { DataService } from "src/app/services/data.service";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { LikedUsersModalComponent } from "src/app/modals/liked-users-modal/liked-users-modal.component";
import { fadeInOut } from "src/app/animations/fade-in-out.animation";

@Component({
  selector: "app-comment-detail",
  templateUrl: "./comment-detail.component.html",
  styleUrls: ["./comment-detail.component.css"],
  animations: [fadeInOut]
})
export class CommentDetailComponent implements OnInit {
  @Input() public comment: any;
  @Input() public loggedInUserId: number;
  @Output() deletedId = new EventEmitter<number>();
  @ViewChild("editCommentInput", { static: false })
  public editCommentInput: ElementRef;

  public commentLikedByUsers: any[];
  public isCommentLikedByUser: boolean;

  public isButtonLoading: boolean;
  public commentContent: string;

  public isCommentBeingEdited: boolean;
  public isFocusOnEditInput: boolean;
  public isCommentBeingDeleted: boolean;
  public afterCommentDeletedFlag: boolean;
  public isBlankInputTooltipShown: boolean;

  constructor(
    private _dataService: DataService,
    private _modalService: NgbModal
  ) {}

  ngOnInit() {
    this.commentLikedByUsers = [];
    this.isCommentLikedByUser = false;
    this.commentContent = "";

    this.isCommentBeingEdited = false;
    this.isFocusOnEditInput = false;
    this.isCommentBeingDeleted = false;
    this.afterCommentDeletedFlag = false;
    this.isBlankInputTooltipShown = false;

    this._dataService.fetchCommentLikedByUsers(this.comment.id).subscribe(
      res => {
        if (res.success) {
          this.commentLikedByUsers = res.users;
          this.isCommentLikedByUser = res.isLikedByLoggedInUser;
          this.isButtonLoading = false;
        }
      },
      error => {
        console.error(error);
      }
    );
  }

  public openLikedUsersModal() {
    if (this.commentLikedByUsers.length === 0) {
      return;
    }

    this._dataService.fetchCommentLikedByUsers(this.comment.id).subscribe(
      res => {
        if (res.success) {
          this.commentLikedByUsers = res.users;
          this.isCommentLikedByUser = res.isLikedByLoggedInUser;

          const modalRef = this._modalService.open(LikedUsersModalComponent, {
            centered: true
          });
          modalRef.componentInstance.postLikedByUsers = this.commentLikedByUsers;
          modalRef.componentInstance.modalContext = "like";
        }
      },
      error => {
        console.error(error);
      }
    );
  }

  public likeComment() {
    this.isButtonLoading = true;
    if (this.isCommentLikedByUser) {
      this._dataService.dislikeComment(this.comment.id).subscribe(
        res => {
          if (res.success) {
            this.commentLikedByUsers = res.users;
            this.isCommentLikedByUser = res.isLikedByLoggedInUser;
            this.isButtonLoading = false;
          }
        },
        error => {
          console.log(error);
        }
      );
    } else {
      this._dataService.likeComment(this.comment.id).subscribe(
        res => {
          if (res.success) {
            this.commentLikedByUsers = res.users;
            this.isCommentLikedByUser = res.isLikedByLoggedInUser;
            this.isButtonLoading = false;
          }
        },
        error => {
          console.error(error);
        }
      );
    }
  }

  public editComment() {
    this.isCommentBeingEdited = true;
    this.commentContent = this.comment.content;
    setTimeout(() => {
      this.editCommentInput.nativeElement.dispatchEvent(new Event("keyup"));
      this.editCommentInput.nativeElement.focus();
    }, 100);
  }

  public cancelEditComment() {
    this.isFocusOnEditInput = false;
    this.isCommentBeingEdited = false;
  }

  public editCommentActions(event) {
    if (event.code === "Enter" && event.shiftKey === false) {
      event.preventDefault();

      if (this.commentContent == "") {
        this.isBlankInputTooltipShown = true;
        setTimeout(() => {
          this.isBlankInputTooltipShown = false;
        }, 3000);
      } else {
        this._dataService
          .updateComment(this.comment.id, { content: this.commentContent })
          .subscribe(res => {
            if (res.success) {
              this.commentContent = "";
              this.comment.content = res.content;
              this.isCommentBeingEdited = false;
            }
          });
      }
    } else if (event.code === "Escape") {
      this.commentContent = this.comment.content;
      this.cancelEditComment();
    }
  }

  public deleteComment() {
    this.isCommentBeingDeleted = true;
    setTimeout(() => {
      this.isCommentBeingDeleted = false;
    }, 5000);
  }

  public deleteCommentActions(option: boolean) {
    this.isCommentBeingDeleted = false;
    if (option) {
      this._dataService.deleteComment(this.comment.id).subscribe(res => {
        if (res.success) {
          this.afterCommentDeletedFlag = true;
          setTimeout(() => {
            this.afterCommentDeletedFlag = false;
            this.deletedId.emit(this.comment.id);
          }, 3000);
        }
      });
    }
  }
}
