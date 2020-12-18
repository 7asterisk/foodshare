import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewlikeComponent } from './viewlike.component';

describe('ViewlikeComponent', () => {
  let component: ViewlikeComponent;
  let fixture: ComponentFixture<ViewlikeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewlikeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewlikeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
