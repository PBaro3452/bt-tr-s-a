import { Component, computed, signal } from '@angular/core';

import { Topping, DrinkModel } from './models';
import { DRINKS } from './mock-drinks';
import { DecimalPipe, JsonPipe } from '@angular/common';
@Component({
  selector: 'app-root',
  imports: [JsonPipe, DecimalPipe],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('bai-tap-tra-sua');
  protected readonly ShopName = signal<string>('QUAN TRA SUA 32');
  
  protected readonly drinks = signal<DrinkModel>(DRINKS[0]);
  protected chonDuongDen():void{
    this.drinks.set(DRINKS[0]);
  }
  protected chonMatcha():void{
    this.drinks.set(DRINKS[1]);
  }
  protected chonHongTra():void{
    this.drinks.set(DRINKS[2]);
  }
  protected readonly  soLy= signal(1);
  
  protected giamSoLy():void{
    if(this.soLy() === 1)
    {
      return;
    }
  this.soLy.update((soLy) => soLy -1);
}
protected tangSoLy():void{
  this.soLy.update((soLy) => soLy +1);
}
protected readonly toppingCanDung = computed(()=>
{
  const congthuc =this.drinks();
  const soLy = this.soLy();
  return congthuc.topping.map((topping:Topping) =>
  {
    return{
      name: topping.name,
      quantity: topping.quantity * soLy,
      unit: topping.unit
    };
  });
});
protected readonly tongTien = computed(() =>
{
  if( this.soLy() >=5)
    {
      let tien = this.drinks().giaCoBan * 4 + this.drinks().giaCoBan*0.9*(this.soLy()-4);
    return tien;
    }
    else
    {let tien = this.drinks().giaCoBan * this.soLy();
      return tien;
    }
});
protected readonly tongTopping = computed(() =>
{
  const total = this.toppingCanDung().reduce((tong, topping) => tong + topping.quantity,0);
  return total;
});

}
