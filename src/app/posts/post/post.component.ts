import { Component, Input, OnInit } from '@angular/core';
import { animate, state, style, transition, trigger } from "@angular/animations";
import { Post } from '../post.model';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
  animations: [
    trigger('add', [
      state('anim', style({
        opacity: 1,
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
})
export class PostComponent implements OnInit {
  constructor() { }

  @Input() post: Post;

  ngOnInit() {
  }
}
