import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmitTryCodeComponent } from './submit-try-code.component';

describe('SubmitTryCodeComponent', () => {
  let component: SubmitTryCodeComponent;
  let fixture: ComponentFixture<SubmitTryCodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubmitTryCodeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubmitTryCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
