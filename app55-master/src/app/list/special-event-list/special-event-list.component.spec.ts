import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecialEventListComponent } from './special-event-list.component';

describe('SpecialEventListComponent', () => {
  let component: SpecialEventListComponent;
  let fixture: ComponentFixture<SpecialEventListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpecialEventListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpecialEventListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
