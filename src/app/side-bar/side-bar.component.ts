import { Component, OnInit } from '@angular/core';
import { BurgerService } from '../header/burger.service';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent implements OnInit {
  constructor(private burgerService: BurgerService) { }

  ngOnInit() {
  }

  onLinkClick() {
    setTimeout(() => {
      this.burgerService.toogleBurger(false);
    }, 200);
  }
}
