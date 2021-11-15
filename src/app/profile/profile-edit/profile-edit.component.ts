import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import * as fromAppReducer from 'src/app/store/app.reducer';
import * as ProfileActions from '../profile-store/profile.actions';
import { Profile } from '../profile.model';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.scss']
})
export class ProfileEditComponent implements OnInit, OnDestroy {
  constructor(private router: Router,
    private route: ActivatedRoute,
    private store: Store<fromAppReducer.AppState>) { }

    profile: Profile;
  profileForm: FormGroup;

  ngOnInit() {
    this.store.select('profile')
      .subscribe(state => {
        this.profile = state.profiles[0];
      });

    this.initForm();
  }

  ngOnDestroy() {
    this.store.dispatch(new ProfileActions.EditMode(false));
  }

  onSubmit() {
    const newUser = this.profileForm.value;
    //======
    newUser.privateMail = 'test@test.ru';
    newUser.id = 1;
    //  new Date().getTime().toString();
    //======
    this.store.dispatch(new ProfileActions.EditProfile(
      { newUser, index: newUser.id }
    ));
    this.store.dispatch(new ProfileActions.SaveProfiles(newUser));
    this.onCancel();
  }

  onCancel() {
    this.router.navigate(['/profile'], { relativeTo: this.route });
    this.store.dispatch(new ProfileActions.EditMode(false));
  }

  initForm() {
    this.profileForm = new FormGroup({
      imageUrl: new FormControl(this.profile.imageUrl),
      position: new FormControl(this.profile.position, [Validators.required]),
      status: new FormControl(this.profile.status),
      employment: new FormControl(this.profile.employment),
      payment: new FormControl(this.profile.payment),
      wishcity: new FormControl(this.profile.wishcity),
      name: new FormControl(this.profile.name, [Validators.required]),
      birthday: new FormControl(this.profile.birthday),
      city: new FormControl(this.profile.city),
      phone: new FormControl(this.profile.phone, [Validators.required]),
      email: new FormControl(this.profile.email, [Validators.required]),
      social: new FormControl(this.profile.social),
    });
  }
}
