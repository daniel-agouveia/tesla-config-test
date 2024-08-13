import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { StepsSelectorService } from '../steps-selector/_service/steps-selector.service';

@Injectable({
    providedIn: 'root'
})
export class StepGuard implements CanActivate {
  constructor(private stepValidationService: StepsSelectorService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const step = route.routeConfig?.path;
    if (step === 'step-2' && !this.stepValidationService.isStepValid('step2')) {
      this.router.navigate(['/step-1']);
      return false;
    }
    if (step === 'step-3' && !this.stepValidationService.isStepValid('step2')) {
      this.router.navigate(['/step-1']);
      return false;
    }
    return true;
  }
}