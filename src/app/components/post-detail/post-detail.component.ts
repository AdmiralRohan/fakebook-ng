import { NgForm, NgModel } from "@angular/forms";
import { Router } from "@angular/router";
import { fadeInOut } from "./../../animations/fade-in-out.animation";
import { LikedUsersModalComponent } from "./../../modals/liked-users-modal/liked-users-modal.component";
import { SharedService } from "../../services/shared.service";
import { SharePostModalComponent } from "../../modals/share-post-modal/share-post-modal.component";
import { DataService } from "../../services/data.service";
import {
  Component,
  OnInit,
  Input,
  ViewChild,
  ElementRef,
  Renderer
} from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: "app-post-detail",
  templateUrl: "./post-detail.component.html",
  styleUrls: ["./post-detail.component.css"],
  animations: [fadeInOut]
})
export class PostDetailComponent implements OnInit {
  @Input() public post: any;
  @Input() public loggedInUserId: number;
  @ViewChild("comment", { static: false }) public comment: ElementRef;
  @ViewChild("editPostInput", { static: false })
  public editPostInput: ElementRef;

  public postLikedByUsers: any[];
  public isPostLikedByUser: boolean;
  public comments: any[];

  public isButtonLoading: boolean;
  public commentInput: string;
  public postContent: string;

  public isPostBeingEdited: boolean;
  public isFocusOnEditInput: boolean;
  public isPostBeingDeleted: boolean;
  public afterPostDeletedFlag: boolean;
  public isPostDeleted: boolean; // To show placeholder after deleting the post
  public isBlankInputTooltipShown: boolean;

  constructor(
    private _dataService: DataService,
    private _sharedService: SharedService,
    private _modalService: NgbModal,
    private _renderer: Renderer,
    private _router: Router
  ) {}

  ngOnInit() {
    this.postLikedByUsers = [];
    this.isPostLikedByUser = true;
    this.comments = [];
    this.commentInput = "";
    this.postContent = "";

    this.isPostBeingEdited = false;
    this.isFocusOnEditInput = false;
    this.isPostBeingDeleted = false;
    this.afterPostDeletedFlag = false;
    this.isPostDeleted = false;
    this.isBlankInputTooltipShown = false;

    this._dataService.fetchCommentsByPost(this.post.id).subscribe(res => {
      if (res.success) {
        this.comments = res.comments;
      }
    });

    this._dataService.fetchPostLikedByUsers(this.post.id).subscribe(
      res => {
        if (res.success) {
          this.postLikedByUsers = res.users;
          this.isPostLikedByUser = res.isLikedByLoggedInUser;
          this.isButtonLoading = false;
        }
      },
      error => {
        console.error(error);
      }
    );
  }

  public get noOfUsersLikedPost(): string {
    return this._sharedService.printArrayCount(this.postLikedByUsers, "like");
  }

  public get noOfComments(): string {
    return this._sharedService.printArrayCount(this.comments, "comment");
  }

  public commentSubmit(event, form: NgForm) {
    if (event.code === "Enter" && event.shiftKey === false) {
      event.preventDefault();

      if (this.commentInput == "") {
        this.isBlankInputTooltipShown = true;
        setTimeout(() => {
          this.isBlankInputTooltipShown = false;
        }, 3000);
      } else {
        this._dataService
          .createComment(this.post.id, { content: this.commentInput })
          .subscribe(res => {
            if (res.success) {
              form.reset();
              this.comments.unshift(res.comment);
              this._renderer.setElementStyle(
                this.comment.nativeElement,
                "height",
                "auto"
              );
            }
          });
      }
    }
  }

  public openLikedUsersModal() {
    if (this.postLikedByUsers.length === 0) {
      return;
    }

    this._dataService.fetchPostLikedByUsers(this.post.id).subscribe(
      res => {
        if (res.success) {
          this.postLikedByUsers = res.users;
          this.isPostLikedByUser = res.isLikedByLoggedInUser;

          const modalRef = this._modalService.open(LikedUsersModalComponent, {
            centered: true
          });
          modalRef.componentInstance.postLikedByUsers = this.postLikedByUsers;
          modalRef.componentInstance.modalContext = "like";
        }
      },
      error => {
        console.error(error);
      }
    );
  }

  public likePost() {
    this.isButtonLoading = true;
    if (this.isPostLikedByUser) {
      this._dataService.dislikePost(this.post.id).subscribe(
        res => {
          if (res.success) {
            this.postLikedByUsers = res.users;
            this.isPostLikedByUser = res.isLikedByLoggedInUser;
            this.isButtonLoading = false;
          }
        },
        error => {
          console.log(error);
        }
      );
    } else {
      this._dataService.likePost(this.post.id).subscribe(
        res => {
          if (res.success) {
            this.postLikedByUsers = res.users;
            this.isPostLikedByUser = res.isLikedByLoggedInUser;
            this.isButtonLoading = false;
          }
        },
        error => {
          console.error(error);
        }
      );
    }
  }

  public commentTextareaFocus() {
    this.comment.nativeElement.focus();
  }

  public sharePost() {
    const modalRef = this._modalService.open(SharePostModalComponent, {
      centered: true
    });
    modalRef.componentInstance.post = this.post;
  }

  public editPost() {
    this.isPostBeingEdited = true;
    this.postContent = this.post.content;
    setTimeout(() => {
      this.editPostInput.nativeElement.dispatchEvent(new Event("keyup"));
      this.editPostInput.nativeElement.focus();
    }, 100);
  }

  public cancelEditPost() {
    this.isFocusOnEditInput = false;
    this.isPostBeingEdited = false;
  }

  public editPostActions(event) {
    if (event.code === "Enter" && event.shiftKey === false) {
      event.preventDefault();

      if (this.postContent == "") {
        this.isBlankInputTooltipShown = true;
        setTimeout(() => {
          this.isBlankInputTooltipShown = false;
        }, 3000);
      } else {
        this._dataService
          .updatePost(this.post.id, { content: this.postContent })
          .subscribe(res => {
            if (res.success) {
              this.postContent = "";
              this.post.content = res.content;
              this.isPostBeingEdited = false;
            }
          });
      }
    } else if (event.code === "Escape") {
      this.postContent = this.post.content;
      this.cancelEditPost();
    }
  }

  public deletePost() {
    this.isPostBeingDeleted = true;
    setTimeout(() => {
      this.isPostBeingDeleted = false;
    }, 5000);
  }

  public deletePostActions(option: boolean) {
    this.isPostBeingDeleted = false;
    if (option) {
      this._dataService.deletePost(this.post.id).subscribe(res => {
        if (res.success) {
          this.afterPostDeletedFlag = true;
          setTimeout(() => {
            this.afterPostDeletedFlag = false;
            this.isPostDeleted = true;
          }, 3000);

          setTimeout(() => {
            if (this._router.url.includes("/post")) {
              this._router.navigate(["/timeline"]);
            }
          }, 5000);
        }
      });
    }
  }

  public onDeletedComment(deletedId: number) {
    this.comments = this.comments.filter(comment => comment.id !== deletedId);
  }
}
