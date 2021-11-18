import { Component, Input, OnInit } from '@angular/core';
import { animate, style, transition, trigger } from "@angular/animations";
import { Post } from '../post.model';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
  animations: [
    trigger('add', [
      transition('void => *', [
        style({
          opacity: 0,
          transform: 'translateY(30px)',
        }),
        animate('500ms ease-in', style({
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
})
export class PostComponent implements OnInit {
  constructor() { }

  @Input() post: Post;

  ngOnInit() {
  }
}
