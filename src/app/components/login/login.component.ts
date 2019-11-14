import { SharedService } from "../../services/shared.service";
import { DataService } from "../../services/data.service";
import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Router } from "@angular/router";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  public formBeingSubmitted: boolean;
  public loginForm = new FormGroup({
    email: new FormControl("", [
      Validators.required,
      Validators.maxLength(254)
    ]),
    password: new FormControl("", Validators.required)
  });

  constructor(
    private _dataService: DataService,
    private _sharedService: SharedService,
    private _router: Router
  ) {}

  ngOnInit() {
    this.formBeingSubmitted = false;
    this._sharedService.logout();
  }

  public login() {
    const loginObj = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password
    };

    this.formBeingSubmitted = true;
    this._dataService.userLogin(loginObj).subscribe(
      res => {
        this.formBeingSubmitted = false;
        if (res.success) {
          const token = res.token;
          delete res.token;
          localStorage.setItem("token", "Bearer " + token);
          localStorage.setItem("userDetails", JSON.stringify(res));
          this._router.navigate(["/timeline"]);
        } else {
          console.error("Error: " + res.msg);
        }
      },
      error => {
        this.formBeingSubmitted = false;
      }
    );
  }
}
