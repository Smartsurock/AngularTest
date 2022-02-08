import { animate, style, transition, trigger } from "@angular/animations";

export const postAnimation = [
  trigger('add', [
    transition('void => *', [
      style({
        opacity: 0,
      }),
      animate(600, style({
        opacity: 1,
      }))
    ]),
    transition('* => void', [
      style({
        opacity: 1,
      }),
      animate(600, style({
        opacity: 0,
      }))
    ])
  ]),
]