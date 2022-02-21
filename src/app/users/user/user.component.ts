import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { take } from 'rxjs/operators';
import { Profile } from 'src/app/profile/profile-models/profile.model';
import * as fromAppReducer from 'src/app/store/app.reducer';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  constructor(private store: Store<fromAppReducer.AppState>) { }

  @Input() profile: Profile;
  @Input() index: number;
  @Input() newMessagesValue: number[];

  myMail: string | undefined;

  ngOnInit(): void {
    this.store.select('auth').pipe(take(1)).subscribe(state => {
      this.myMail = state.user?.email;
    });
  }
}
