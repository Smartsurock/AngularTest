import { Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { animate, style, transition, trigger } from "@angular/animations";
import { Post } from '../post.model';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as fromAppReducer from 'src/app/store/app.reducer';
import { Subscription } from 'rxjs';
import { FormControl, FormGroup } from '@angular/forms';
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
export class PostComponent implements OnInit, OnDestroy {
  constructor(private router: Router,
    private store: Store<fromAppReducer.AppState>) { }

  @Input() post: Post;
  @Input() index: number;
  @Output() delete = new EventEmitter<any>();

  edit: boolean = false;

  profileSub: Subscription;
  authSub: Subscription;
  editForm: FormGroup;
  canEdit: boolean;

  @ViewChild('textarea') textarea: ElementRef;

  ngOnInit() {
    this.store.select('auth').subscribe(state => {
      if (state.user) {
        this.canEdit = state.user.email === this.post.userEmail;
      }
    });
  }

  ngOnDestroy() {
    this.unsubscriber(this.profileSub);
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
    setTimeout(() => { this.textarea.nativeElement.focus() }, 300);
  }

  onSaveBtn() {
    let newPost = JSON.parse(JSON.stringify(this.post));
    newPost.text = this.editForm.value.edit;
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
    this.profileSub = this.store.select('profile').subscribe(state => {
      userIndex = state.profiles.findIndex(profile => {
        return profile.privateMail === this.post.userEmail;
      });
    });

    this.router.navigate([`/users/${userIndex}`]);
  }
}
