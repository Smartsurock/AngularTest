import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { SideBarComponent } from './side-bar/side-bar.component';
import { ProfileComponent } from './profile/profile.component';
import { UsersComponent } from './users/users.component';
import { RouterModule } from '@angular/router';
import { appRouting } from './app.routing';
import { PostsComponent } from './posts/posts.component';
import { PostComponent } from './posts/post/post.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProfileEditComponent } from './profile/profile-edit/profile-edit.component';
import { StoreModule } from '@ngrx/store';
import * as fromAppReducer from './store/app.reducer';
import { ReactiveFormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';
import { ProfileEffects } from './profile/profile-store/profile.effects';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { UserComponent } from './users/user/user.component';
import { AuthComponent } from './auth/auth.component';
import { AuthEffects } from './auth/auth-store/auth.effects';
import { ErrorPageComponent } from './error-page/error-page.component';
import { ErrorComponent } from './auth/error/error.component';
import { SpinnerComponent } from './auth/spinner/spinner.component';
import { UserInfoComponent } from './users/user-info/user-info.component';
import { UsersListComponent } from './users/users-list/users-list.component';
import { PostsEffects } from './posts/posts-store/posts.effects';
import { AuthInterceptor } from './auth/auth.interceptor';
import { MessagesComponent } from './messages/messages.component';
import { MessageComponent } from './messages/message/message.component';
import { SelectFriendComponent } from './messages/select-friend/select-friend.component';
import { MessagesEffects } from './messages/messages-store/messages.effects';
import { GifsComponent } from './gifs/gifs.component';
import { UnreadMessagesComponent } from './side-bar/unread-messages/unread-messages.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SideBarComponent,
    ProfileComponent,
    UsersComponent,
    PostsComponent,
    PostComponent,
    ProfileEditComponent,
    UserComponent,
    AuthComponent,
    ErrorPageComponent,
    ErrorComponent,
    SpinnerComponent,
    UserInfoComponent,
    UsersListComponent,
    MessagesComponent,
    MessageComponent,
    SelectFriendComponent,
    GifsComponent,
    UnreadMessagesComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(appRouting, { useHash: true }),
    BrowserAnimationsModule,
    StoreModule.forRoot(fromAppReducer.appReducer),
    EffectsModule.forRoot([AuthEffects, ProfileEffects, PostsEffects, MessagesEffects]),
    ReactiveFormsModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
