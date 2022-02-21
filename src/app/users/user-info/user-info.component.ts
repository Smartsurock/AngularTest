import { Location } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent implements OnInit {
  constructor(private location: Location) { }

  ngOnInit(): void { }

  @HostListener('document:keydown.escape')
  onEscape() {
    this.location.back();
  }
}
