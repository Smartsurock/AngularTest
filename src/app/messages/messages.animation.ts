import { animate, group, query, state, style, transition, trigger } from "@angular/animations";

export const messagesAnimation = [
  trigger('route', [
    state('any', style({
      position: 'absolute',
    })),
    transition('* <=> *', [
      group([
        query(':leave', [
          style({
            position: 'absolute',
            opacity: 1,
            top: '0px',
            left: '0px',
            right: '0px',
            bottom: '0px',
            transform: 'translateY(0px)',
          }),
          animate('500ms ease-in',
            style({
              opacity: 0,
              transform: 'translateY(-40px)',
            })
          )
        ], { optional: true }),
        query(':enter', [
          style({
            position: 'absolute',
            opacity: 0,
            top: '0px',
            left: '0px',
            right: '0px',
            bottom: '0px',
            transform: 'translateY(40px)',
          }),
          animate('500ms ease-in',
            style({
              opacity: 1,
              transform: 'translateY(0)',
            })
          )
        ], { optional: true }),
      ])
    ])
  ]),
];