import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatinboxComponent } from './chatinbox.component';

describe('ChatinboxComponent', () => {
  let component: ChatinboxComponent;
  let fixture: ComponentFixture<ChatinboxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatinboxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatinboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
