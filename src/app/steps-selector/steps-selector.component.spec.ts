import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StepsSelectorComponent } from './steps-selector.component';

describe('StepsSelectorComponent', () => {
  let component: StepsSelectorComponent;
  let fixture: ComponentFixture<StepsSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StepsSelectorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StepsSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
