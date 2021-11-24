import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { Profile } from 'src/app/profile/profile-models/profile.model';
import * as fromAppReducer from '../../store/app.reducer';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {
  constructor(private store: Store<fromAppReducer.AppState>) { }

  profiles: Profile[];

  ngOnInit() {
    this.store.select('profile').pipe(take(1)).subscribe(state => {
      this.profiles = state.profiles;
    })
  }
}
