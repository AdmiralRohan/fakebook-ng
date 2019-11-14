import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SharePostModalComponent } from './share-post-modal.component';

describe('SharePostModalComponent', () => {
  let component: SharePostModalComponent;
  let fixture: ComponentFixture<SharePostModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SharePostModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SharePostModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
