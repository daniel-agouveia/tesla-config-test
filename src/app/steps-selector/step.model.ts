export interface Step {
  id: string;
  name: string;
  url: string;
  isValid: boolean;
}

export interface TeslaFormData {
  step1: FormStep;
  step2: FormStep;
}

export interface FormStep {
  model?: string;
  color?: string;
  config?: number | null;
  towHitch?: boolean;
  yoke?: boolean;
}
