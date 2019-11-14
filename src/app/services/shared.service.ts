import { environment } from "../../environments/environment";
import { Router } from "@angular/router";
import { Injectable } from "@angular/core";
import { HttpHeaders, HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class SharedService {
  private _url = environment.url;
  constructor(private _router: Router, private _http: HttpClient) {}

  public setAuthHeader(isAuthSet: boolean = true): HttpHeaders {
    let headers = new HttpHeaders();
    headers = headers.append("Content-Type", "application/json");

    if (isAuthSet) {
      let token = localStorage.getItem("token");
      headers = headers.append("Authorization", token);
    }
    return headers;
  }

  public logout() {
    if (localStorage.getItem("token")) {
      this._http
        .post<any>(
          `${this._url}/users/logout`,
          {},
          {
            headers: this.setAuthHeader()
          }
        )
        .subscribe(res => {
          if (res.success) {
            localStorage.clear();
            this._router.url === "/register"
              ? this._router.navigate(["/register"])
              : this._router.navigate(["/login"]);
          }
        });
    }
  }

  /**
   * @name printArrayCount
   * @description Takes an array and print the number of elements in useful manner in the view.
   * @example No like yet / 1 like / 3 likes
   *
   * @param array $arr The array to count
   * @param string $text_in_middle Text to put in the middle
   * @param boolean $use_yet Whether append "yet" at the end of the string
   * @return string
   */
  public printArrayCount(
    arr: Array<any>,
    textInMiddle: string,
    useYet: boolean = true
  ): string {
    return `${arr.length === 0 ? "No" : arr.length} ${textInMiddle}${
      arr.length > 1 ? "s" : ""
    }${useYet ? (arr.length === 0 ? " yet" : "") : ""}`;
  }
}
