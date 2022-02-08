import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable({ providedIn: 'root' })
export class BurgerService {
  constructor() { }

  public burger = new Subject<boolean>();

  toggleBurger(value: boolean) {
    this.burger.next(value);
  }
}