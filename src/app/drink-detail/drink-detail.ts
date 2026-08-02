import { Component, computed, signal, input } from '@angular/core';
import { Topping, DrinkModel } from '../models';
import { JsonPipe, DecimalPipe } from '@angular/common';
@Component({
  selector: 'app-drink-detail',
  imports: [JsonPipe, DecimalPipe],
  templateUrl: './drink-detail.html',
  styleUrl: './drink-detail.css',
})
export class DrinkDetail {
    protected readonly  soLy= signal(1);
  readonly drinks = input.required<DrinkModel>()
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

