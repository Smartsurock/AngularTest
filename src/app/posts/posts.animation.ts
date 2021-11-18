import { animate, state, style, transition, trigger } from "@angular/animations";

export const postsAnimation = [
  trigger('add', [
    state('anim', style({
      opacity: 0,
      transform: 'translateY(50px)',
    })),
    transition('void => *', [
      animate(2500, style({
        opacity: 1,
        transform: 'translateY(0px)',
      }))
    ]),
    transition('* => void', [
      animate(2500, style({
        opacity: 0,
        transform: 'translateY(20px)',
      }))
    ]),
  ]),
]