import { SharedService } from "./shared.service";
import { environment } from "../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class DataService {
  private _url = environment.url;
  constructor(
    private _http: HttpClient,
    private _sharedService: SharedService
  ) {}

  // User Routes
  public userRegister(registerModel: any): Observable<any> {
    return this._http.post<any>(`${this._url}/users/register`, registerModel, {
      headers: this._sharedService.setAuthHeader(false)
    });
  }

  public userLogin(loginModel: any): Observable<any> {
    return this._http.post<any>(`${this._url}/users/login`, loginModel, {
      headers: this._sharedService.setAuthHeader(false)
    });
  }

  public fetchTimelinePosts(): Observable<any> {
    return this._http.get<any>(`${this._url}/users/timeline`, {
      headers: this._sharedService.setAuthHeader()
    });
  }

  // Fetch Profile Posts
  public fetchPostsByProfileId(profileId: number): Observable<any> {
    return this._http.get<any>(`${this._url}/users/profile/${profileId}`, {
      headers: this._sharedService.setAuthHeader()
    });
  }

  // Post Routes
  public fetchPostById(postId: number): Observable<any> {
    return this._http.get<any>(`${this._url}/posts/${postId}`, {
      headers: this._sharedService.setAuthHeader()
    });
  }

  public createPost(content: object): Observable<any> {
    return this._http.post<any>(`${this._url}/posts`, content, {
      headers: this._sharedService.setAuthHeader()
    });
  }

  public updatePost(postId: number, content: object): Observable<any> {
    return this._http.patch<any>(`${this._url}/posts/${postId}`, content, {
      headers: this._sharedService.setAuthHeader()
    });
  }

  public deletePost(postId: number): Observable<any> {
    return this._http.delete<any>(`${this._url}/posts/${postId}`, {
      headers: this._sharedService.setAuthHeader()
    });
  }

  public likePost(postId: number): Observable<any> {
    return this._http.post<any>(
      `${this._url}/posts/${postId}/like`,
      {},
      {
        headers: this._sharedService.setAuthHeader()
      }
    );
  }

  public dislikePost(postId: number): Observable<any> {
    return this._http.post<any>(
      `${this._url}/posts/${postId}/dislike`,
      {},
      {
        headers: this._sharedService.setAuthHeader()
      }
    );
  }

  public fetchPostLikedByUsers(postId: number): Observable<any> {
    return this._http.get<any>(`${this._url}/posts/${postId}/liked-by-users`, {
      headers: this._sharedService.setAuthHeader()
    });
  }

  public sharePost(postId: number, content: object): Observable<any> {
    return this._http.post<any>(`${this._url}/posts/${postId}/share`, content, {
      headers: this._sharedService.setAuthHeader()
    });
  }

  public fetchCommentsByPost(postId: number): Observable<any> {
    return this._http.get<any>(`${this._url}/posts/${postId}/comments`, {
      headers: this._sharedService.setAuthHeader()
    });
  }

  public createComment(postId: number, content: object): Observable<any> {
    return this._http.post<any>(
      `${this._url}/posts/${postId}/comments`,
      content,
      {
        headers: this._sharedService.setAuthHeader()
      }
    );
  }

  // Comment Routes
  public updateComment(commentId: number, content: object): Observable<any> {
    return this._http.patch<any>(
      `${this._url}/comments/${commentId}`,
      content,
      {
        headers: this._sharedService.setAuthHeader()
      }
    );
  }

  public deleteComment(commentId: number): Observable<any> {
    return this._http.delete<any>(`${this._url}/comments/${commentId}`, {
      headers: this._sharedService.setAuthHeader()
    });
  }

  public likeComment(commentId: number): Observable<any> {
    return this._http.post<any>(
      `${this._url}/comments/${commentId}/like`,
      {},
      {
        headers: this._sharedService.setAuthHeader()
      }
    );
  }

  public dislikeComment(commentId: number): Observable<any> {
    return this._http.post<any>(
      `${this._url}/comments/${commentId}/dislike`,
      {},
      {
        headers: this._sharedService.setAuthHeader()
      }
    );
  }

  public fetchCommentLikedByUsers(commentId: number): Observable<any> {
    return this._http.get<any>(
      `${this._url}/comments/${commentId}/liked-by-users`,
      {
        headers: this._sharedService.setAuthHeader()
      }
    );
  }

  // Friend Routes
  public fetchFriendList(): Observable<any> {
    return this._http.get<any>(`${this._url}/users/friend-list`, {
      headers: this._sharedService.setAuthHeader()
    });
  }

  public fetchReceivedFriendRequests(): Observable<any> {
    return this._http.get<any>(`${this._url}/users/received-friend-requests`, {
      headers: this._sharedService.setAuthHeader()
    });
  }

  public fetchSentFriendRequests(): Observable<any> {
    return this._http.get<any>(`${this._url}/users/sent-friend-requests`, {
      headers: this._sharedService.setAuthHeader()
    });
  }

  public addFriend(userId: number): Observable<any> {
    return this._http.post<any>(
      `${this._url}/users/${userId}/add-friend`,
      {},
      {
        headers: this._sharedService.setAuthHeader()
      }
    );
  }

  public cancelRequest(userId: number): Observable<any> {
    return this._http.post<any>(
      `${this._url}/users/${userId}/cancel-request`,
      {},
      {
        headers: this._sharedService.setAuthHeader()
      }
    );
  }

  public confirmRequest(userId: number): Observable<any> {
    return this._http.post<any>(
      `${this._url}/users/${userId}/confirm-request`,
      {},
      {
        headers: this._sharedService.setAuthHeader()
      }
    );
  }

  public deleteRequest(userId: number): Observable<any> {
    return this._http.post<any>(
      `${this._url}/users/${userId}/delete-request`,
      {},
      {
        headers: this._sharedService.setAuthHeader()
      }
    );
  }

  public unfriend(userId: number): Observable<any> {
    return this._http.post<any>(
      `${this._url}/users/${userId}/unfriend`,
      {},
      {
        headers: this._sharedService.setAuthHeader()
      }
    );
  }

  // Message Routes
  public fetchInboxMessages(): Observable<any> {
    return this._http.get<any>(`${this._url}/users/inbox`, {
      headers: this._sharedService.setAuthHeader()
    });
  }

  public fetchMessagesByUser(userId: number): Observable<any> {
    return this._http.get<any>(`${this._url}/users/messages/${userId}`, {
      headers: this._sharedService.setAuthHeader()
    });
  }

  public sendMessage(userId: number, content: object): Observable<any> {
    return this._http.post<any>(
      `${this._url}/users/messages/${userId}`,
      content,
      {
        headers: this._sharedService.setAuthHeader()
      }
    );
  }
}
