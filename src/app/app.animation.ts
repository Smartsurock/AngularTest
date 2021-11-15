import { animate, query, state, style, transition, trigger } from "@angular/animations";

export const appAnimation = [
  trigger('route', [
    state('any', style({
      position: 'absolute',
    })),
    transition('* <=> *', [
      query(':enter, :leave', [
        style({
          position: 'absolute',
          width: '100%',
          opacity: 0,
          top: 0,
          transform: 'translateY(40px)',
        })
      ], { optional: true }),
      query(':enter', [
        animate('500ms',
          style({
            opacity: 1,
            transform: 'translateY(0%)',
          })
        )
      ], { optional: true }),
    ])
  ]),
];