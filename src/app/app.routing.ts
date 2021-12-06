import { Routes } from "@angular/router";
import { PostsComponent } from "./posts/posts.component";
import { ProfileEditComponent } from "./profile/profile-edit/profile-edit.component";
import { ProfileComponent } from "./profile/profile.component";
import { UsersComponent } from "./users/users.component";
import { ProfileEditResolver } from "./profile/profile-edit.resolver";
import { ProfileResolver } from "./profile/profile.resolver";
import { AuthComponent } from "./auth/auth.component";
import { ErrorPageComponent } from "./error-page/error-page.component";
import { UserInfoComponent } from "./users/user-info/user-info.component";
import { UsersListComponent } from "./users/users-list/users-list.component";
import { AuthGuard } from "./auth/auth.guard";
import { PostsResolver } from "./posts/posts.resolver";
import { MessagesComponent } from "./messages/messages.component";
import { MessageComponent } from "./messages/message/message.component";
import { SelectFriendComponent } from "./messages/select-friend/select-friend.component";
import { MessagesResolver } from "./messages/messages.resolver";
import { GifsComponent } from "./gifs/gifs.component";

export const appRouting: Routes = [
  { path: '', redirectTo: '/profile', pathMatch: 'full' },
  { path: 'login', component: AuthComponent, data: { animation: '4' } },
  {
    path: 'profile', component: ProfileComponent,
    resolve: [ProfileResolver, PostsResolver, MessagesResolver],
    canActivate: [AuthGuard],
    children: [
      {
        path: 'edit', component: ProfileEditComponent,
        resolve: [ProfileEditResolver],
        data: { animation: '1' },
      },
    ]
  },
  {
    path: 'messages', component: MessagesComponent,
    resolve: [ProfileResolver, MessagesResolver],
    canActivate: [AuthGuard],
    data: { animation: '8' },
    children: [
      { path: '', component: SelectFriendComponent, },
      { path: ':id', component: MessageComponent, data: { animation: '10' }, }
    ]
  },
  {
    path: 'users', component: UsersComponent,
    resolve: [ProfileResolver, MessagesResolver],
    canActivate: [AuthGuard],
    data: { animation: '2' },
    children: [
      { path: '', component: UsersListComponent, data: { animation: '7' }, },
      { path: ':id', component: UserInfoComponent, data: { animation: '6' }, },
    ]
  },
  {
    path: 'posts', component: PostsComponent,
    resolve: [ProfileResolver, PostsResolver, MessagesResolver],
    canActivate: [AuthGuard],
    data: { animation: '3' }
  },
  {
    path: 'gifs', component: GifsComponent,
    resolve: [MessagesResolver],
    canActivate: [AuthGuard],
    data: { animation: '11' }
  },
  {
    path: 'error', component: ErrorPageComponent,
    data: { animation: '9', message: "Такая страничка не существует или ещё не создана!" },
  },
  {
    path: '**', redirectTo: '/error', pathMatch: 'full',
    data: { animation: '5' }
  },
]