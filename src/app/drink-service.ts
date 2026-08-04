import { Injectable, signal } from '@angular/core'; 
import { DrinkModel } from './models';
import { DRINKS } from './mock-drinks';
@Injectable({
  providedIn: 'root',
})
export class DrinkService {
  private readonly drinksState = signal<DrinkModel[]>(DRINKS);
  readonly drinks = this.drinksState.asReadonly();
  getDrinkById(id: number): DrinkModel|undefined
  {
    return this.drinksState().find((drink) =>drink.id === id);
  }
  addrink(newDrink: DrinkModel):void{
this.drinksState.update((current) => [...current,newDrink]);
  }
}

