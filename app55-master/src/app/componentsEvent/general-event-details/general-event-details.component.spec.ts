import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralEventDetailsComponent } from './general-event-details.component';

describe('GeneralEventDetailsComponent', () => {
  let component: GeneralEventDetailsComponent;
  let fixture: ComponentFixture<GeneralEventDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeneralEventDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneralEventDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
