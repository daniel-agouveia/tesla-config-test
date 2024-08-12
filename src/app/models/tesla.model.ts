export interface TeslaModel {
  code: string;
  description: string;
  colors: Array<Color>;
}

export interface Color {
  code: string;
  description: string;
  price: number | null;
}

export interface Option {
  configs: Array<Config>;
  towHitch: boolean;
  yoke: boolean;
}

export interface Config {
  id: number;
  description: string;
  range: number;
  speed: number;
  price: number;
}

export interface Tesla {
  model: string;
  config: Config | undefined;
  towHitch: boolean;
  yoke: boolean;
  color: Color | undefined;
}
