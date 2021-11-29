import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { take } from 'rxjs/operators';
import { Profile } from 'src/app/profile/profile-models/profile.model';
import * as fromAppReducer from 'src/app/store/app.reducer';

@Component({
  selector: 'app-select-friend',
  templateUrl: './select-friend.component.html',
  styleUrls: ['./select-friend.component.scss']
})
export class SelectFriendComponent implements OnInit {
  constructor(private store: Store<fromAppReducer.AppState>) { }

  profiles: Profile[];

  ngOnInit() {
    this.store.select('profile').pipe(take(1)).subscribe(state => {
      this.profiles = state.profiles;
    });
  }
}
