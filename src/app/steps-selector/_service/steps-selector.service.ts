import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { FormStep, Step, TeslaFormData } from '../step.model';

@Injectable({
  providedIn: 'root'
})
export class StepsSelectorService {

  private stepStatus: BehaviorSubject<Record<string, boolean>> = new BehaviorSubject<Record<string, boolean>>({
    'step1': true
  });
  public stepStatus$: Observable<Record<string, boolean>> = this.stepStatus.asObservable();

  public stepData: TeslaFormData = {
    step1: {model: '', color: ''},
    step2: {config: null, towHitch: false, yoke: false}
  };

  constructor(
  ) { }

  public getStepsList(): Observable<Array<Step>> {
    return of(
      [
        {
          id: 'step1',
          name: 'Step 1',
          url: '/step-1',
          isValid: false
        },
        {
          id: 'step2',
          name: 'Step 2',
          url: '/step-2',
          isValid: false
        },
        {
          id: 'step3',
          name: 'Step 3',
          url: '/step-3',
          isValid: false
        }
      ]
    )
  }

  public updateStatus(step: string, isValid: boolean): void {
    const status: Record<string, boolean> = this.stepStatus.value;
    status[step] = isValid;
    this.stepStatus.next(status);
  }

  public setStepData<T>(step: keyof TeslaFormData, data: FormStep) {
    this.stepData[step] = data;
  }

  public getStepData(step: keyof TeslaFormData): FormStep {
    return this.stepData[step];
  }

  public isStepValid(step: string): boolean {
    return this.stepStatus.value[step] || false;
  }
}
