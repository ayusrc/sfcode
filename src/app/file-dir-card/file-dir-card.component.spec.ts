import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FileDirCardComponent } from './file-dir-card.component';

describe('FileDirCardComponent', () => {
  let component: FileDirCardComponent;
  let fixture: ComponentFixture<FileDirCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FileDirCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FileDirCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
