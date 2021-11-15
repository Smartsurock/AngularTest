import { Component, OnInit } from '@angular/core';
import { animate, state, style, transition, trigger } from "@angular/animations";

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
  animations: [
    trigger('rout', [
      state('from', style({
        opacity: 0.1,
        transform: 'translateX(0)',
      })),
      // state('to', style({
      //   transform: 'translateX(200px)',
      // })),
      // transition('from => to', animate(500)),
      transition('* => void', [
        animate(500, style({
          opacity: 0,
          transform: 'translateY(20px)',
        }))
      ])
    ]),
  ]
})
export class PostsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  posts = ['123', 'asd', '32', 'askgfsfgkasfas', 'askgfsfgkasfas', 'cZC ', 'askgfsfgkasfas', 'fsdf', 'askgfsfgkasfas', 'askgfsfgsDSAkasfas', 'sad', '4324', 'askgfSF sfgkasfas', 'askgfsfgkasfas', 'askgfsfgkasfas', 'fgh', '6456', 'cZXC', 'askgfsfgkasfas', 'askgfsfgkasfas', 'askgfsfgkasfas', 'askgfsfgkasfas', 'askgfsfgkasfas', 'sdad', 'askgfsfgkasfas', 'askgfsfgkasfas'];


  ondelete(index) {
    this.posts.splice(index, 1)
  }
}
