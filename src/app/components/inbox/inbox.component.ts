import { Component, OnInit } from "@angular/core";
import { DataService } from "src/app/services/data.service";
import { SharedService } from "src/app/services/shared.service";

@Component({
  selector: "app-inbox",
  templateUrl: "./inbox.component.html",
  styleUrls: ["./inbox.component.css"]
})
export class InboxComponent implements OnInit {
  public contacts: any;
  public messages: any;
  public users: string[];

  constructor(
    private _dataService: DataService,
    private _sharedService: SharedService
  ) {}

  ngOnInit() {
    this.contacts = {};
    this.messages = {};
    this.users = [];

    this._dataService.fetchInboxMessages().subscribe(res => {
      console.log(res);
      if (res.success) {
        this.contacts = res.contacts;
        this.messages = res.messages;
        this.users = Object.keys(this.messages);
      }
    });
  }

  public get noOfContacts(): string {
    return this._sharedService.printArrayCount(this.users, "contact");
  }
}
