import { SharedService } from "../../services/shared.service";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-nav",
  templateUrl: "./nav.component.html",
  styleUrls: ["./nav.component.css"]
})
export class NavComponent implements OnInit {
  public isNavbarCollapsed = true;
  constructor(private _sharedService: SharedService) {}

  ngOnInit() {}

  public logout() {
    this._sharedService.logout();
  }

  public toggleNavbar() {
    this.isNavbarCollapsed = !this.isNavbarCollapsed;
  }
}
