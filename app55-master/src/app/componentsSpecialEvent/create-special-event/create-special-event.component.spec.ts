import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSpecialEventComponent } from './create-special-event.component';

describe('CreateSpecialEventComponent', () => {
  let component: CreateSpecialEventComponent;
  let fixture: ComponentFixture<CreateSpecialEventComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateSpecialEventComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateSpecialEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
