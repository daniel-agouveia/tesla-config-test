import { CommonModule } from '@angular/common';
import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { take } from 'rxjs';
import { TeslaService } from '../../../_services/tesla.service';
import { Option } from '../../../models/tesla.model';
import { StepsSelectorService } from '../../_service/steps-selector.service';
import { FormStep } from '../../step.model';

@Component({
  selector: 'app-step-2',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './step-2.component.html',
  styleUrl: './step-2.component.scss'
})
export class Step2Component implements OnInit {

  public form = this.fb.group({
    config: new FormControl<number | null>(null, [Validators.required]),
    towHitch: new FormControl<boolean>(false, []),
    yoke: new FormControl<boolean>(false, [])
  });

  private destroyRef: DestroyRef = inject(DestroyRef);

  constructor(
    private fb: FormBuilder,
    public teslaService: TeslaService,
    private stepsService: StepsSelectorService
  ) {
    this.configControl.valueChanges.pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (value) => {
        if (value) {
          teslaService.selectedConfig = this.teslaService.configList.find(opt => opt.id === +value);
        }
      }
    });

    this.towHitchControl.valueChanges.pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (value) => {
        if (value) {
          teslaService.hasTowHitch = value;
        }
      }
    });

    this.yokeControl.valueChanges.pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (value) => {
        if (value) {
          teslaService.hasYoke = value;
        }
      }
    });

    this.form.valueChanges.pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: () => {
        if (this.form.valid) {
          this.stepsService.setStepData('step2', this.form.value as FormStep);
          this.stepsService.updateStatus('step3', this.form.valid);
        }
      }
    });
  }

  ngOnInit(): void {
    this.getOptionsList();
    const savedData = this.stepsService.getStepData('step2');
    if (savedData) {
      this.form.patchValue(savedData);
    }
  }

  public get configControl(): FormControl {
    return this.form.controls['config'];
  }

  public get towHitchControl(): FormControl {
    return this.form.controls['towHitch'];
  }

  public get yokeControl(): FormControl {
    return this.form.controls['yoke'];
  }

  private getOptionsList(): void {
    this.teslaService.getOptionsList(this.teslaService.selectedModel).pipe(take(1), takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (value: Option) => {
        this.teslaService.selectedOption = value;
        this.teslaService.configList = value.configs;
      }
    });
  }
}
