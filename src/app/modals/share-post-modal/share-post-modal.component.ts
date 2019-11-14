import { DataService } from "./../../services/data.service";
import { Component, OnInit, Input } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: "app-share-post-modal",
  templateUrl: "./share-post-modal.component.html",
  styleUrls: ["./share-post-modal.component.css"]
})
export class SharePostModalComponent implements OnInit {
  @Input() public post: any;
  public postContent: string;

  constructor(
    public activeModal: NgbActiveModal,
    private _dataService: DataService
  ) {}

  ngOnInit() {
    this.postContent = "";
  }

  public sharePost() {
    console.log("Share post:", this.postContent);
    this._dataService
      .sharePost(this.post.id, { content: this.postContent })
      .subscribe(res => {
        if (res.success) {
          console.log("Shared post ID:", res.sharedPostId);
          this.activeModal.close();
        }
      });
  }
}
