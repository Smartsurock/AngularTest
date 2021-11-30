import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Params, Router, RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import * as fromAppReducer from '../store/app.reducer';
import * as ProfileActions from './profile-store/profile.actions';
import { profileAnimation } from './profile.animation';
import { Profile } from './profile-models/profile.model';
import { Job } from './profile-models/job.model';

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

  profile: Profile;
  editing: boolean;
  profileSub: Subscription;
  authSub: Subscription;
  routeSub: Subscription;
  userMail: string;
  edit: boolean;
  userId: number;
  userIndex: number;
  skillsForm: FormGroup;
  experienceForm: FormGroup;
  skills: boolean = false;
  experience: boolean = false;
  addExperience: boolean = false;
  changeSkills: boolean = false;
  formId: number;
  newUserId: number;

  ngOnInit() {
    this.routeSub = this.route.params.subscribe((params: Params) => {
      this.edit = params['id'] === undefined || null;
      if (!this.edit) {
        this.userId = params['id'];
      }
    });

    this.authSub = this.store.select('auth').subscribe(state => {
      if (state.user) {
        this.userMail = state.user.email;
      }
    });

    if (this.edit) {
      this.profileSub = this.store.select('profile').subscribe(state => {
        this.editing = state.editing;
        this.userIndex = state.profiles.findIndex(profile => {
          return profile.privateMail === this.userMail;
        });
        if (this.userIndex >= 0) {
          this.profile = state.profiles[this.userIndex];
        } else {
          this.newUserId = state.profiles.length;
          this.createNewProfile();
        }
      });
    } else {
      this.profileSub = this.store.select('profile').subscribe(state => {
        this.profile = state.profiles[this.userId];
      });
    }
  }

  createNewProfile() {
    const newProfile = new Profile(this.newUserId, '', '', '', '', '', '', '', '', '', '', '', '', '', '', []);
    newProfile.privateMail = this.userMail;
    newProfile.imageUrl = 'https://cdn-0.imagensemoldes.com.br/wp-content/uploads/2020/03/Lilo-Stitch-PNG-15-1419x1536.png';

    this.store.dispatch(new ProfileActions.AddProfile(newProfile));
  }

  ngOnDestroy() {
    this.unsubscriber(this.authSub);
    this.unsubscriber(this.profileSub);
    this.unsubscriber(this.routeSub);
  }

  unsubscriber(subscription: Subscription) {
    if (subscription) {
      subscription.unsubscribe();
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

  onChangeSkills() {
    this.skills = true;
    this.changeSkills = true;
    this.skillsForm = new FormGroup({
      skills: new FormControl(this.profile.skills),
    });
  }

  onSaveSkills() {
    const updatedProfile = JSON.parse(JSON.stringify(this.profile));

    updatedProfile.skills = this.skillsForm.value.skills;
    this.store.dispatch(new ProfileActions.EditProfile({ newUser: updatedProfile, index: this.userIndex }));

    this.onCancelSkills();
  }

  onCancelSkills() {
    this.skills = false;
    this.changeSkills = false;
  }

  onChangeExperience(index: number) {
    this.experience = true;
    this.formId = index;

    this.experienceForm = new FormGroup({
      place: new FormControl(this.profile.jobs[index].place),
      position: new FormControl(this.profile.jobs[index].position),
      period: new FormControl(this.profile.jobs[index].period),
    });
  }

  onAddExperience() {
    this.experience = true;
    this.formId = -1;

    this.experienceForm = new FormGroup({
      place: new FormControl(null),
      position: new FormControl(null),
      period: new FormControl(null),
    });
  }

  onSaveExperience(index: number) {
    const updatedProfile = JSON.parse(JSON.stringify(this.profile));
    if (this.formId === -1) {
      const newJob = new Job(this.experienceForm.value.place, this.experienceForm.value.position, this.experienceForm.value.period);

      updatedProfile.jobs.push(newJob);
      this.store.dispatch(new ProfileActions.EditProfile(
        { newUser: updatedProfile, index: this.userIndex }
      ));
    } else if (this.formId > -1) {
      const updatJob = new Job(this.experienceForm.value.place, this.experienceForm.value.position, this.experienceForm.value.period);
      const updatedJob = {
        ...updatedProfile.jobs[index],
        ...updatJob
      }
      const updatedJobs = [...updatedProfile.jobs];
      updatedJobs[index] = updatedJob;
      updatedProfile.jobs = updatedJobs;

      this.store.dispatch(new ProfileActions.EditProfile({
        newUser: updatedProfile, index: this.userIndex
      }));
    }

    this.onCancelExperience();
  }

  onDeleteExperience(index: number) {
    const updatedProfile = JSON.parse(JSON.stringify(this.profile));
    updatedProfile.jobs.splice(index, 1);
    this.store.dispatch(new ProfileActions.EditProfile({
      newUser: updatedProfile, index: this.userIndex
    }));
  }

  onCancelExperience() {
    this.experience = false;
    this.formId = null;
  }

  onSendMessage() {
    this.router.navigate([`/messages/${this.userId}`]);
  }
}
