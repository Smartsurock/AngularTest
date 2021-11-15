import { transition, trigger, style, animate } from '@angular/animations';

export const headerAnimation = [
  trigger(
    'Login',
    [
      transition(
        ':enter',
        [
          style({
            transformStyle: 'preserve-3d',
            transform: 'rotateX(-90deg) translateZ(18px)'
          }),
          animate('500ms',
            style({ transform: 'rotateX(0deg) translateZ(18px)' }))
        ]
      ),
      transition(
        ':leave',
        [
          style({
            transformStyle: 'preserve-3d',
            transform: 'rotateX(0deg) translateZ(18px)',
          }),
          animate('500ms',
            style({ transform: 'rotateX(-90deg) translateZ(18px)' }))
        ]
      )
    ]
  ),
  trigger(
    'Logout',
    [
      transition(
        ':enter',
        [
          style({
            transform: 'rotateX(90deg) translateZ(18px)',
            transformStyle: 'preserve-3d',
          }),
          animate('500ms',
            style({ transform: 'rotateX(0deg) translateZ(18px)' }))
        ]
      ),
      transition(
        ':leave',
        [
          style({
            transformStyle: 'preserve-3d',
            transform: 'rotateX(0deg) translateZ(18px)'
          }),
          animate('500ms',
            style({ transform: 'rotateX(90deg) translateZ(18px)' }))
        ]
      )
    ]
  ),
  trigger(
    'userName',
    [
      transition(
        ':enter',
        [
          style({
            transform: 'rotateX(90deg) translateZ(18px)',
            transformStyle: 'preserve-3d',
          }),
          animate('500ms',
            style({ transform: 'rotateX(0deg) translateZ(18px)' }))
        ]
      ),
      transition(
        ':leave',
        [
          style({
            transformStyle: 'preserve-3d',
            transform: 'rotateX(0deg) translateZ(18px)'
          }),
          animate('500ms',
            style({ transform: 'rotateX(-90deg) translateZ(18px)' }))
        ]
      )
    ]
  )
]