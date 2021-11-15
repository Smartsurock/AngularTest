import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromAppReducer from 'src/app/store/app.reducer';
import * as AuthActions from '../auth-store/auth.actions';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss']
})
export class ErrorComponent implements OnInit {
  constructor(private store: Store<fromAppReducer.AppState>) { }

  @Input() error: string;

  ngOnInit() { }

  onCleanError() {
    this.store.dispatch(new AuthActions.ClearError());
  }
}
