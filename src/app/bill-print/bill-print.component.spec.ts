import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BillPrintComponent } from './bill-print.component';

describe('BillPrintComponent', () => {
  let component: BillPrintComponent;
  let fixture: ComponentFixture<BillPrintComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BillPrintComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BillPrintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
