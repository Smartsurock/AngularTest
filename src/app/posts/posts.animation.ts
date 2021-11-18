import { animate, style, transition, trigger } from "@angular/animations";

export const postsAnimation = [
  trigger('add', [
    transition('void => *', [
      style({
        opacity: 0,
        transform: 'translateY(30px)',
      }),
      animate('7500ms ease-in', style({
        opacity: 1,
        transform: 'translateY(0px)',
      }))
    ]),
    transition('* => void', [
      animate('500ms ease-in', style({
        opacity: 0,
        transform: 'translateY(30px)',
      }))
    ]),
  ]),
]