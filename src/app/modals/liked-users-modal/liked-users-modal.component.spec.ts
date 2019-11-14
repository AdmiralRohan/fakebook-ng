import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LikedUsersModalComponent } from './liked-users-modal.component';

describe('LikedUsersModalComponent', () => {
  let component: LikedUsersModalComponent;
  let fixture: ComponentFixture<LikedUsersModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LikedUsersModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LikedUsersModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
