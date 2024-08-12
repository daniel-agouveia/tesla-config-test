import { CommonModule } from '@angular/common';
import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RouterModule } from '@angular/router';
import { TeslaService } from '../_services/tesla.service';
import { StepsSelectorService } from './_service/steps-selector.service';
import { Step1Component } from './step-content/step-1/step-1.component';
import { Step2Component } from './step-content/step-2/step-2.component';
import { Step3Component } from './step-content/step-3/step-3.component';
import { Step } from './step.model';

@Component({
  selector: 'app-steps-selector',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    Step1Component,
    Step2Component,
    Step3Component
  ],
  templateUrl: './steps-selector.component.html',
  styleUrl: './steps-selector.component.scss'
})
export class StepsSelectorComponent implements OnInit {

  public stepsList: Array<Step> = [];
  private destroyRef: DestroyRef = inject(DestroyRef);

  public currentStep: string = '';

  public isLoaded: boolean = false;

  public selectedModel: string = '';

  constructor(
    private stepsService: StepsSelectorService,
    public teslaService: TeslaService
  ) {}

  ngOnInit(): void {
    this.stepsService.getStepsList().pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (list: Array<Step>) => {
        this.stepsList = list;
      }
    });

    this.stepsService.stepStatus$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (status: Record<string, boolean>) => {
        this.stepsList.forEach((step: Step) => {
          step.isValid = status[step.id];
        });
      }
    });
  }
}
