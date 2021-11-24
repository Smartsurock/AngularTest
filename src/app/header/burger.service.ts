import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable({ providedIn: 'root' })
export class BurgerService {
  constructor() { }

  public burgerIcon = new Subject<boolean>();

  toogleBurger(value: boolean) {
    this.burgerIcon.next(value);
  }
}