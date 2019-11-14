import { DataService } from "../../services/data.service";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-post",
  templateUrl: "./post.component.html",
  styleUrls: ["./post.component.css"]
})
export class PostComponent implements OnInit {
  private _postId: number;
  public post: any;
  public loggedInUserId: number;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _dataService: DataService
  ) {}

  ngOnInit() {
    this.post = {};
    if (localStorage.getItem("userDetails")) {
      this.loggedInUserId = JSON.parse(
        localStorage.getItem("userDetails")
      ).user.userId;
    }

    this._route.params.subscribe(params => {
      this._postId = params.postId;
      console.log("Post ID", this._postId);

      this._dataService.fetchPostById(this._postId).subscribe(
        res => {
          console.log(res);
          if (res.success) {
            this.post = res.post;
          } else {
            this._router.navigate(["/404"]);
          }
        },
        error => {
          console.log(error);
          this._router.navigate(["/404"]);
        }
      );
    });
  }
}
