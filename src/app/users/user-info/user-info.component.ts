import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent implements OnInit {
  constructor(private location: Location) { }

  edit = false;

  ngOnInit(): void {
  }

  onBack() {
    this.location.back();
  }
}
