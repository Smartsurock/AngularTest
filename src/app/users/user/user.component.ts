import { Component, Input, OnInit } from '@angular/core';
import { Profile } from 'src/app/profile/profile-models/profile.model';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  constructor() { }

  @Input() profile: Profile;
  @Input() index: number;

  ngOnInit() {
  }

}
