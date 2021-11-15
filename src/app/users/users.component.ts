import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { Profile } from '../profile/profile.model';
import * as fromAppReducer from '../store/app.reducer';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  constructor(private store: Store<fromAppReducer.AppState>) { }

  profiles: Profile[];

  ngOnInit() {
    this.store.select('profile')
      .subscribe(state => {
        this.profiles = state.profiles;
      })
  }
}
