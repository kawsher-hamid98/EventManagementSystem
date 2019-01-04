import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketPrintingComponent } from './ticket-printing.component';

describe('TicketPrintingComponent', () => {
  let component: TicketPrintingComponent;
  let fixture: ComponentFixture<TicketPrintingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TicketPrintingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TicketPrintingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
