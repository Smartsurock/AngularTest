import { Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { animate, style, transition, trigger } from "@angular/animations";
import { Post } from '../post.model';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as fromAppReducer from 'src/app/store/app.reducer';
import { Subscription } from 'rxjs';
import { FormControl, FormGroup } from '@angular/forms';
import * as PostsActions from '../posts-store/posts.actions';
import { take } from 'rxjs/operators';

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
      ])
    ]),
  ]
})
export class PostComponent implements OnInit, OnDestroy {
  constructor(private router: Router,
    private store: Store<fromAppReducer.AppState>) { }

  @Input() post: Post;
  @Input() index: number;
  @Output() delete = new EventEmitter<any>();

  edit: boolean = false;

  authSub: Subscription;
  editForm: FormGroup;
  canEdit: boolean;

  @ViewChild('textarea') textarea: ElementRef;

  ngOnInit() {
    this.authSub = this.store.select('auth').subscribe(state => {
      if (state.user) {
        this.canEdit = state.user.email === this.post.userEmail;
      }
    });
  }

  ngOnDestroy() {
    this.unsubscriber(this.authSub);
  }

  unsubscriber(subscription: Subscription) {
    if (subscription) {
      subscription.unsubscribe();
    }
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
      index: this.index, newPost: newPost
    }));
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
