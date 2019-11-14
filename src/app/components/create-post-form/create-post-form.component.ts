import { fadeInOut } from "src/app/animations/fade-in-out.animation";
import { DataService } from "./../../services/data.service";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-create-post-form",
  templateUrl: "./create-post-form.component.html",
  styleUrls: ["./create-post-form.component.css"],
  animations: [fadeInOut]
})
export class CreatePostFormComponent implements OnInit {
  public postContent: string;
  public isValid: boolean;
  public afterPostSubmittedFlag: boolean;

  constructor(private _dataService: DataService) {}

  ngOnInit() {
    this.postContent = "";
    this.isValid = true;
    this.afterPostSubmittedFlag = false;
  }

  onSubmit() {
    if (this.postContent.trim().length === 0) {
      this.isValid = false;
      setTimeout(() => {
        this.isValid = true;
      }, 3000);
    } else {
      this._dataService
        .createPost({ content: this.postContent })
        .subscribe(res => {
          if (res.success) {
            this.postContent = "";
            this.afterPostSubmittedFlag = true;
            setTimeout(() => {
              this.afterPostSubmittedFlag = false;
            }, 15000);
          }
        });
    }
  }
}
