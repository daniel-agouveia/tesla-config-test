import { Routes } from '@angular/router';
import { StepGuard } from './_guards/step.guard';
import { Step1Component } from './steps-selector/step-content/step-1/step-1.component';
import { Step2Component } from './steps-selector/step-content/step-2/step-2.component';
import { Step3Component } from './steps-selector/step-content/step-3/step-3.component';

export const routes: Routes = [
  {
    path: '', redirectTo: 'step-1', pathMatch: 'full',
  },
  {
    path: 'step-1', component: Step1Component
  },
  {
    path: 'step-2', component: Step2Component, canActivate: [StepGuard]
  },
  {
    path: 'step-3', component: Step3Component, canActivate: [StepGuard]
  }
];
