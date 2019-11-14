import { MessageComponent } from "./components/message/message.component";
import { InboxComponent } from "./components/inbox/inbox.component";
import { FriendsComponent } from "./components/friends/friends.component";
import { LayoutComponent } from "./components/layout/layout.component";
import { AuthGuard } from "./guards/auth.guard";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LoginComponent } from "./components/login/login.component";
import { RegisterComponent } from "./components/register/register.component";
import { TimelineComponent } from "./components/timeline/timeline.component";
import { ProfileComponent } from "./components/profile/profile.component";
import { PostComponent } from "./components/post/post.component";
import { NotFoundComponent } from "./components/not-found/not-found.component";

const routes: Routes = [
  { path: "login", component: LoginComponent },
  { path: "register", component: RegisterComponent },
  {
    path: "",
    component: LayoutComponent,
    children: [
      { path: "", redirectTo: "timeline", pathMatch: "full" },
      { path: "timeline", component: TimelineComponent },
      { path: "profile", component: ProfileComponent },
      { path: "profile/:profileId", component: ProfileComponent },
      { path: "post/:postId", component: PostComponent },
      { path: "friends", component: FriendsComponent },
      { path: "inbox", component: InboxComponent },
      { path: "message/:userId", component: MessageComponent }
    ],
    canActivate: [AuthGuard]
  },
  { path: "404", component: NotFoundComponent },
  { path: "**", component: NotFoundComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      onSameUrlNavigation: "reload",
      scrollPositionRestoration: "enabled"
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
