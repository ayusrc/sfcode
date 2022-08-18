import {ComponentFixture, TestBed} from '@angular/core/testing';

import {IdeCompileComponent} from './ide-compile.component';

describe('IdeCompileComponent', () => {
  let component: IdeCompileComponent;
  let fixture: ComponentFixture<IdeCompileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IdeCompileComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IdeCompileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
