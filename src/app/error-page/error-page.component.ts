import { Location } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, Data } from '@angular/router';

@Component({
  selector: 'app-error-page',
  templateUrl: './error-page.component.html',
  styleUrls: ['./error-page.component.scss']
})
export class ErrorPageComponent implements OnInit {
  constructor(private location: Location,
    private route: ActivatedRoute) { }

  errorMessage: string;

  ngOnInit() {
    this.route.data.subscribe((data: Data) => {
      this.errorMessage = data['message'];
    });
  }

  @HostListener('document:keydown.escape', ['$event'])
  onEscape(event: KeyboardEvent) {
    this.location.back();
  }
}
