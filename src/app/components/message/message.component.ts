import { SharedService } from "src/app/services/shared.service";
import { DataService } from "./../../services/data.service";
import {
  Component,
  OnInit,
  Renderer,
  ViewChild,
  ElementRef
} from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { NgForm } from "@angular/forms";

@Component({
  selector: "app-message",
  templateUrl: "./message.component.html",
  styleUrls: ["./message.component.css"]
})
export class MessageComponent implements OnInit {
  @ViewChild("message", { static: false }) public message: ElementRef;
  public loggedInUserId: number;
  public profileName: string;
  public friendId: number;
  public friendName: string;
  public messages: any[];
  public messageContent: string;
  public isBlankInputTooltipShown: boolean;

  constructor(
    private _dataService: DataService,
    private _sharedService: SharedService,
    private _route: ActivatedRoute,
    private _renderer: Renderer
  ) {}

  ngOnInit() {
    this.friendName = "";
    this.messages = [];
    this.messageContent = "";
    this.isBlankInputTooltipShown = false;

    this._route.params.subscribe(params => {
      this.friendId = params.userId;

      if (localStorage.getItem("userDetails")) {
        const { user } = JSON.parse(localStorage.getItem("userDetails"));
        this.loggedInUserId = user.userId;
        this.profileName = user.fname + " " + user.lname;
      }

      this._dataService.fetchMessagesByUser(this.friendId).subscribe(res => {
        if (res.success) {
          this.messages = res.messages;
          this.friendName = res.friendName;
        }
      });
    });
  }

  public get noOfMessages(): string {
    return this._sharedService.printArrayCount(this.messages, "message");
  }

  public messageSubmit(event, form: NgForm) {
    if (event.code === "Enter" && event.shiftKey === false) {
      event.preventDefault();

      if (this.messageContent == "") {
        this.isBlankInputTooltipShown = true;
        setTimeout(() => {
          this.isBlankInputTooltipShown = false;
        }, 3000);
      } else {
        this._dataService
          .sendMessage(this.friendId, { content: this.messageContent })
          .subscribe(res => {
            if (res.success) {
              form.reset();
              this._renderer.setElementStyle(
                this.message.nativeElement,
                "height",
                "auto"
              );

              this._dataService
                .fetchMessagesByUser(this.friendId)
                .subscribe(res => {
                  if (res.success) {
                    this.messages = res.messages;
                  }
                });
            }
          });
      }
    }
  }
}
