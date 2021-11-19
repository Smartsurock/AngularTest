import { Routes } from "@angular/router";
import { PostsComponent } from "./posts/posts.component";
import { ProfileEditComponent } from "./profile/profile-edit/profile-edit.component";
import { ProfileComponent } from "./profile/profile.component";
import { UsersComponent } from "./users/users.component";
import { EditResolver } from "./profile/edit.resolver";
import { ProfileResolver } from "./profile/profile.resolver";
import { AuthComponent } from "./auth/auth.component";
import { ErrorPageComponent } from "./error-page/error-page.component";
import { UserInfoComponent } from "./users/user-info/user-info.component";
import { UsersListComponent } from "./users/users-list/users-list.component";
import { AuthGuard } from "./auth/auth.guard";
import { PostsResolver } from "./posts/posts.resolver";

export const appRouting: Routes = [
  { path: '', redirectTo: '/profile', pathMatch: 'full' },
  { path: 'login', component: AuthComponent, data: { animation: '4' } },
  {
    path: 'profile', component: ProfileComponent,
    resolve: [ProfileResolver, PostsResolver],
    canActivate: [AuthGuard],
    children: [
      {
        path: 'edit', component: ProfileEditComponent,
        resolve: [EditResolver],
        data: { animation: '1' },
      },
    ]
  },
  {
    path: 'users', component: UsersComponent,
    resolve: [ProfileResolver],
    canActivate: [AuthGuard],
    data: { animation: '2' },
    children: [
      { path: '', component: UsersListComponent, data: { animation: '7' }, },
      { path: ':id', component: UserInfoComponent, data: { animation: '6' }, }
    ]
  },
  {
    path: 'posts', component: PostsComponent,
    resolve: [ProfileResolver, PostsResolver],
    canActivate: [AuthGuard],
    data: { animation: '3' }
  },
  { path: 'error', component: ErrorPageComponent, data: { animation: '5' } },
  {
    path: '**', redirectTo: '/error', pathMatch: 'full',
    data: { animation: '5' }
  },
]