import { Component, computed, signal } from '@angular/core';

import { Topping, DrinkModel } from './models';
import { DRINKS } from './mock-drinks';
import { DecimalPipe, JsonPipe } from '@angular/common';
import { DrinkDetail } from "./drink-detail/drink-detail";
@Component({
  selector: 'app-root',
  imports: [JsonPipe, DecimalPipe, DrinkDetail],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('bai-tap-tra-sua');
  protected readonly ShopName = signal<string>('QUAN TRA SUA 32');
  
  readonly thucuong = signal<DrinkModel[]>(DRINKS);
  protected readonly drinks = signal<DrinkModel>(DRINKS[0]);
  protected chonMon(drinks: DrinkModel):void{
    this.drinks.set(drinks);
  }
 protected readonly giaCaoNhat = computed(() =>
 {
  const maxPrice = Math.max(...this.thucuong().map((drink) => drink.giaCoBan));
  return maxPrice;
 })

}
