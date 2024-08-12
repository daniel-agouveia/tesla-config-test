import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { TeslaService } from '../../../_services/tesla.service';
import { Tesla } from '../../../models/tesla.model';

@Component({
  selector: 'app-step-3',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './step-3.component.html',
  styleUrl: './step-3.component.scss'
})
export class Step3Component implements OnInit {
  public completeConfiguration: Tesla = {
    model: '',
    color: undefined,
    config: undefined,
    towHitch: false,
    yoke: false
  };

  public totalCost: number = 0;

  constructor(
    private teslaService: TeslaService
  ) {}

  ngOnInit(): void {
    this.fetchSavedData();
  }

  private fetchSavedData(): void {
    this.completeConfiguration = {
      model: this.teslaService.selectedModel,
      color: this.teslaService.selectedColor,
      config: this.teslaService.selectedConfig,
      towHitch: this.teslaService.hasTowHitch,
      yoke: this.teslaService.hasYoke
    }
    debugger;
    this.totalCost = this.completeConfiguration.config?.price! + this.completeConfiguration.color?.price!;

    if (this.completeConfiguration.towHitch) {
      this.totalCost += this.teslaService.towHitchPrice;
    }

    if (this.completeConfiguration.yoke) {
      this.totalCost += this.teslaService.yokePrice;
    }

    console.log(this.totalCost);
  }
}
