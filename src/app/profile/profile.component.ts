import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import * as fromAppReducer from '../store/app.reducer';
import * as ProfileActions from './profile-store/profile.actions';
import { profileAnimation } from './profile.animation';
import { Profile } from './profile.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  animations: [profileAnimation]
})
export class ProfileComponent implements OnInit, OnDestroy {
  constructor(private router: Router,
    private route: ActivatedRoute,
    private store: Store<fromAppReducer.AppState>) { }

  editing: boolean;
  editingSub: Subscription;
  profile: Profile;
  userMail: string;

  ngOnInit() {
    this.store.select('auth').subscribe(state => {
      this.userMail = state.user.email;
    })

    this.editingSub = this.store.select('profile').subscribe(state => {
      this.editing = state.editing;
      let index = state.profiles.findIndex(profile => {
        return profile.privateMail === this.userMail;
      });
      this.profile = state.profiles[index];
    });

    console.log(this.userMail);

  }

  ngOnDestroy() {
    if (this.editingSub) {
      this.editingSub.unsubscribe();
    }
  }

  onEdit() {
    this.router.navigate(['edit'], { relativeTo: this.route });
    this.store.dispatch(new ProfileActions.EditMode(true));
  }

  routeAnimation(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData
      && outlet.activatedRouteData['animation'];
  }
}
