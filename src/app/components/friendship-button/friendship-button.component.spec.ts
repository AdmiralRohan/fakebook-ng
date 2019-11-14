import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FriendshipButtonComponent } from './friendship-button.component';

describe('FriendshipButtonComponent', () => {
  let component: FriendshipButtonComponent;
  let fixture: ComponentFixture<FriendshipButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FriendshipButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FriendshipButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
