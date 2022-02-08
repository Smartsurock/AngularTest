import { Location } from '@angular/common';
import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Data } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-error-page',
  templateUrl: './error-page.component.html',
  styleUrls: ['./error-page.component.scss']
})
export class ErrorPageComponent implements OnInit, OnDestroy {
  constructor(
    private location: Location,
    private route: ActivatedRoute,
  ) { }

  errorMessage: string;
  routeSub: Subscription;

  ngOnInit() {
    this.routeSub = this.route.data.subscribe((data: Data) => {
      this.errorMessage = data['message'];
    });
  }

  ngOnDestroy() {
    this.unsubscriber(this.routeSub);
  }

  unsubscriber(subscription: Subscription) {
    if (subscription) {
      subscription.unsubscribe();
    }
  }

  @HostListener('document:keydown.escape')
  onEscape() {
    this.location.back();
  }
}
