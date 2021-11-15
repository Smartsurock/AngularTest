import { Routes } from "@angular/router";
import { PostsComponent } from "./posts/posts.component";
import { ProfileEditComponent } from "./profile/profile-edit/profile-edit.component";
import { ProfileComponent } from "./profile/profile.component";
import { UsersComponent } from "./users/users.component";
import { EditResolver } from "./profile/edit.resolver";
import { ProfileResolver } from "./profile/profile.resolver";
import { AuthComponent } from "./auth/auth.component";
import { ErrorPageComponent } from "./error-page/error-page.component";

export const appRouting: Routes = [
  { path: '', redirectTo: '/profile', pathMatch: 'full' },
  { path: 'login', component: AuthComponent, data: { animation: '4' } },
  {
    path: 'profile', component: ProfileComponent,
    resolve: [ProfileResolver],
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
    data: { animation: '2' }
  },
  { path: 'posts', component: PostsComponent, data: { animation: '3' } },
  { path: 'error', component: ErrorPageComponent, data: { animation: '5' } },
  {
    path: '**', redirectTo: '/error', pathMatch: 'full',
    data: { animation: '5' }
  },
]