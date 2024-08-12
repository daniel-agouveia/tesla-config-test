import { CommonModule } from '@angular/common';
import { Component, DestroyRef, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { take } from 'rxjs';
import { TeslaService } from '../../../_services/tesla.service';
import { Color, TeslaModel } from '../../../models/tesla.model';
import { StepsSelectorService } from '../../_service/steps-selector.service';
import { FormStep } from '../../step.model';

@Component({
  selector: 'app-step-1',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './step-1.component.html',
  styleUrl: './step-1.component.scss'
})
export class Step1Component implements OnInit {

  @Output() public isValid: EventEmitter<boolean> = new EventEmitter<boolean>();

  private destroyRef: DestroyRef = inject(DestroyRef);

  public form = this.fb.group({
    model: new FormControl<string>('', [Validators.required]),
    color: new FormControl<string>('', [Validators.required])
  });

  constructor(
    private fb: FormBuilder,
    private stepService: StepsSelectorService,
    public teslaService: TeslaService
  ) {
    this.modelControl.valueChanges.pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (value) => {
        if (value !== teslaService.selectedModel) {
          stepService.stepData['step2'].config = null;
          stepService.stepData['step2'].towHitch = false;
          stepService.stepData['step2'].yoke = false;
        }
        this.optionChange(value);
      }
    });

    this.colorControl.valueChanges.pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (value) => {
        this.updateColorControl(this.teslaService.colorList, value);
      }
    });

    this.form.valueChanges.pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: () => {
        if (this.form.valid) {
          this.stepService.setStepData('step1', this.form.value as FormStep);
          this.stepService.updateStatus('step2', this.form.valid);
        }
      }
    });
  }

  ngOnInit(): void {
    this.teslaService.getTeslaModelList().pipe(take(1), takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (reply: Array<TeslaModel>) => {
        this.teslaService.modelList = reply;
      }
    });

    const savedData = this.stepService.getStepData('step1');
    if (savedData) {
      this.form.patchValue(savedData);
      this.optionChange(savedData.model!, savedData.color!);
    }
  }

  public get modelControl(): FormControl {
    return this.form.controls['model'];
  }

  public get colorControl(): FormControl {
    return this.form.controls['color'];
  }

  public optionChange(option: string, savedData?: string): void {
    if (option) {
      this.teslaService.selectedModel = option;
      const colors: Array<Color> | undefined = this.teslaService.modelList.find(model => model.code === option)?.colors;
      if (colors) {
        this.teslaService.colorList = colors;
      }
      this.colorControl.patchValue(savedData ? savedData : colors![0].code);
      this.updateColorControl(colors, this.colorControl.value);
    }
  }

  public updateColorControl(colors: Array<Color> | undefined, savedData?: string): void {
    if (colors && colors?.length > 0) {
      this.teslaService.selectedColor = colors.find(color => color.code === savedData)!;
    }
  }
}
