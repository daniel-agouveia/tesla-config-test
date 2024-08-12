import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map } from 'rxjs';
import { Color, Config, Option, TeslaModel } from '../models/tesla.model';

@Injectable({
  providedIn: 'root'
})
export class TeslaService {

  public modelList: Array<TeslaModel> = [];
  public configList: Array<Config> = [];
  public colorList: Array<Color> = [];
  public selectedOption: Option | undefined = undefined;
  public selectedConfig: Config | undefined = undefined;
  public hasYoke: boolean = false;
  public hasTowHitch: boolean = false;
  public selectedColor: Color | undefined = {
    code: '',
    description: '',
    price: null
  };
  public selectedModel: string = '';

  public towHitchPrice: number = 1000;
  public yokePrice: number = 1000;

  constructor(
    private httpClient: HttpClient
  ) { }


  public getTeslaModelList(): Observable<Array<TeslaModel>> {
    return this.httpClient.get<Array<TeslaModel>>('/models').pipe(
      catchError((error: HttpErrorResponse) => {
        throw error;
      }),
      map((response: Array<TeslaModel>) => {
        return response;
      })
    );
  }

  public getOptionsList(id: string): Observable<Option> {
    return this.httpClient.get<Option>(`/options/${id}`).pipe(
      catchError((error: HttpErrorResponse) => {
        throw error;
      }),
      map((response: Option) => {
        return response;
      })
    );
  }
}
