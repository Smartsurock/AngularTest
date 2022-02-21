import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnreadMessagesComponent } from './unread-messages.component';

describe('UnreadMessagesComponent', () => {
  let component: UnreadMessagesComponent;
  let fixture: ComponentFixture<UnreadMessagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UnreadMessagesComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UnreadMessagesComponent);
    component = fixture.componentInstance;
    component.unreadMessages = 5;
    fixture.detectChanges();
  });

  it('Компонент создан', () => {
    expect(component).toBeTruthy();
  });

  it('Инпут проверен', () => {
    expect(component.unreadMessages).toBe(5);
  });

  it('Шаблон проверен', () => {
    let span = fixture.debugElement.nativeElement.querySelector('span');
    expect(span.innerText).toEqual('5');
  });
});
