import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { animate, style, transition, trigger } from "@angular/animations";
import { Post } from '../post.model';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { take } from 'rxjs/operators';
import { FormControl, FormGroup } from '@angular/forms';
import * as fromAppReducer from 'src/app/store/app.reducer';
import * as PostsActions from '../posts-store/posts.actions';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
  animations: [
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
})
export class PostComponent implements OnInit {
  constructor(private router: Router,
    private store: Store<fromAppReducer.AppState>) { }

  @Input() post: Post;
  @Input() index: number;
  @Output() delete = new EventEmitter<number>();
  @ViewChild('textarea') textarea: ElementRef;

  edit: boolean = false;
  editForm: FormGroup;
  canEdit: boolean;

  ngOnInit() {
    this.store.select('auth').pipe(take(1)).subscribe(state => {
      if (state.user) {
        this.canEdit = state.user.email === this.post.userEmail;
      }
    });
  }

  onEditBtn() {
    this.edit = true;
    this.editForm = new FormGroup({
      edit: new FormControl(this.post.text),
    });
    setTimeout(() => {
      this.textarea.nativeElement.focus()
      this.textarea.nativeElement.addEventListener('keydown',
        (event: KeyboardEvent) => {
          if (event.key === 'Enter') {
            this.onSaveBtn();
          }
        });
    }, 100);
  }

  onSaveBtn() {
    let newPost = JSON.parse(JSON.stringify(this.post));
    newPost.text = this.editForm.value.edit.replace(/\s{2,}/g, ' ');
    this.store.dispatch(new PostsActions.EditPost({
      index: this.index, newPost
    }));
    this.store.dispatch(new PostsActions.SavePosts());
    this.onCancelBtn();
  }

  onCancelBtn() {
    this.edit = false;
  }

  onDeleteBtn() {
    this.delete.emit(this.index);
  }

  onUserClick() {
    let userIndex: number;
    this.store.select('profile').pipe(take(1)).subscribe(state => {
      userIndex = state.profiles.findIndex(profile => {
        return profile.privateMail === this.post.userEmail;
      });
    });

    if (userIndex >= 0) {
      this.router.navigate([`/users/${userIndex}`]);
    } else {
      this.router.navigate(['/error']);
    }
  }
}
