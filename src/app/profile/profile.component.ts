import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Params, Router, RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import * as fromAppReducer from '../store/app.reducer';
import * as ProfileActions from './profile-store/profile.actions';
import { profileAnimation } from './profile.animation';
import { Profile } from './profile-model/profile.model';

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
  profileSub: Subscription;
  authSub: Subscription;
  routeSub: Subscription;
  profile: Profile;
  userMail: string;
  edit: boolean;
  userId: number;
  userIndex: number;

  skills: boolean = false;
  experience: boolean = false;

  skillsForm: FormGroup;
  experienceForm: FormGroup;

  ngOnInit() {
    this.routeSub = this.route.params.subscribe((params: Params) => {
      this.edit = params['id'] === undefined || null;
      if (!this.edit) {
        this.userId = params['id'];
      }
    });

    if (this.edit) {
      this.authSub = this.store.select('auth').subscribe(state => {
        if (state.user) {
          this.userMail = state.user.email;
        }
      })

      this.profileSub = this.store.select('profile').subscribe(state => {
        this.editing = state.editing;
        this.userIndex = state.profiles.findIndex(profile => {
          return profile.privateMail === this.userMail;
        });
        this.profile = state.profiles[this.userIndex];
      });
    } else {
      this.profileSub = this.store.select('profile').subscribe(state => {
        this.profile = state.profiles[this.userId];
      });
    }
  }

  ngOnDestroy() {
    this.unsubscriber(this.authSub);
    this.unsubscriber(this.profileSub);
    this.unsubscriber(this.routeSub);
  }

  onEdit() {
    this.router.navigate(['edit'], { relativeTo: this.route });
    this.store.dispatch(new ProfileActions.EditMode(true));
  }

  unsubscriber(subscribe: Subscription) {
    if (subscribe) {
      subscribe.unsubscribe();
    }
  }

  routeAnimation(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData
      && outlet.activatedRouteData['animation'];
  }

  onChangeSkills() {
    this.skills = true;
    this.skillsForm = new FormGroup({
      skills: new FormControl(null),
    });
  }

  onSaveSkills() {

  }

  onCancelSkills() {
    this.skills = false;
  }

  onAddExperience() {

  }

  onChangeExperience() {

  }
}
