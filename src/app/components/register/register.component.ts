import { SharedService } from "../../services/shared.service";
import { Component, OnInit } from "@angular/core";
import {
  FormGroup,
  Validators,
  FormBuilder,
  ValidatorFn
} from "@angular/forms";
import { DataService } from "../../services/data.service";
import { Router } from "@angular/router";

const PasswordMatchCheck: ValidatorFn = (group: FormGroup) => {
  const pass = group.get("password").value;
  const confirmPass = group.get("confirmpassword").value;

  return pass === confirmPass ? null : { passwordMismatch: true };
};

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"]
})
export class RegisterComponent implements OnInit {
  public formBeingSubmitted: boolean;
  public registerForm: FormGroup;

  constructor(
    private _dataService: DataService,
    private _sharedService: SharedService,
    private _router: Router,
    public fb: FormBuilder
  ) {}

  ngOnInit() {
    this.formBeingSubmitted = false;
    this._sharedService.logout();

    this.registerForm = this.fb.group(
      {
        fname: [
          "",
          [
            Validators.required,
            Validators.maxLength(100),
            Validators.minLength(2)
          ]
        ],
        lname: ["", [Validators.required, Validators.maxLength(100)]],
        email: ["", [Validators.required, Validators.maxLength(254)]],
        password: ["", Validators.required],
        confirmpassword: [""]
      },
      {
        validator: PasswordMatchCheck
      }
    );
  }

  public register() {
    const registerObj = {
      firstName: this.registerForm.value.fname,
      lastName: this.registerForm.value.lname,
      email: this.registerForm.value.email,
      password: this.registerForm.value.password
    };

    this.formBeingSubmitted = true;
    this._dataService.userRegister(registerObj).subscribe(
      res => {
        console.log(res);
        this.formBeingSubmitted = false;
        if (res.success) {
          this._router.navigate(["/login"]);
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
