import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecialEventDetailsComponent } from './special-event-details.component';

describe('SpecialEventDetailsComponent', () => {
  let component: SpecialEventDetailsComponent;
  let fixture: ComponentFixture<SpecialEventDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpecialEventDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpecialEventDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
