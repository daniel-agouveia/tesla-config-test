import { Component } from '@angular/core';
import { StepsSelectorComponent } from './steps-selector/steps-selector.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    StepsSelectorComponent
  ],
  templateUrl: "app.component.html",
})
export class AppComponent {

}
