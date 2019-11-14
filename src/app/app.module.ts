import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from "@angular/core";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { AppRoutingModule } from "./app-routing.module";

import { AppComponent } from "./app.component";
import { LoginComponent } from "./components/login/login.component";
import { RegisterComponent } from "./components/register/register.component";
import { TimelineComponent } from "./components/timeline/timeline.component";
import { ProfileComponent } from "./components/profile/profile.component";
import { PostComponent } from "./components/post/post.component";
import { NavComponent } from "./components/nav/nav.component";
import { NotFoundComponent } from "./components/not-found/not-found.component";
import { LayoutComponent } from "./components/layout/layout.component";
import { CommentDetailComponent } from "./components/comment-detail/comment-detail.component";
import { PostDetailComponent } from "./components/post-detail/post-detail.component";
import { PreventDefaultDirective } from "./directives/prevent-default/prevent-default.directive";
import { SharePostModalComponent } from "./modals/share-post-modal/share-post-modal.component";
import { LikedUsersModalComponent } from "./modals/liked-users-modal/liked-users-modal.component";
import { FormControlStatusDirective } from "./directives/form-control-status/form-control-status.directive";
import { FriendshipButtonComponent } from "./components/friendship-button/friendship-button.component";
import { AutoAdjustTextareaDirective } from "./directives/auto-adjust-textarea/auto-adjust-textarea.directive";
import { CreatePostFormComponent } from "./components/create-post-form/create-post-form.component";
import { FriendsComponent } from "./components/friends/friends.component";
import { FriendDetailComponent } from "./components/friend-detail/friend-detail.component";
import { InboxComponent } from "./components/inbox/inbox.component";
import { MessageComponent } from "./components/message/message.component";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    TimelineComponent,
    ProfileComponent,
    PostComponent,
    NavComponent,
    NotFoundComponent,
    LayoutComponent,
    CommentDetailComponent,
    PostDetailComponent,
    PreventDefaultDirective,
    SharePostModalComponent,
    LikedUsersModalComponent,
    FormControlStatusDirective,
    FriendshipButtonComponent,
    AutoAdjustTextareaDirective,
    CreatePostFormComponent,
    FriendsComponent,
    FriendDetailComponent,
    InboxComponent,
    MessageComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [SharePostModalComponent, LikedUsersModalComponent]
})
export class AppModule {}
