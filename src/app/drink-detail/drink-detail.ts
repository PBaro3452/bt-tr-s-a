import { Component, computed, signal, input, inject } from '@angular/core';
import { Topping, DrinkModel } from '../models';
import { DecimalPipe } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { DrinkService } from '../drink-service';
import { toSignal } from '@angular/core/rxjs-interop';
@Component({
  selector: 'app-drink-detail',
  imports: [DecimalPipe, RouterLink],
  templateUrl: './drink-detail.html',
  styleUrl: './drink-detail.css',
})
export class DrinkDetail {

  private readonly route = inject(ActivatedRoute);
  private readonly drinkService = inject(DrinkService);
private readonly params = toSignal(this.route.paramMap);

protected readonly selectedDrinkFromParams = computed(()=>
{
  const id = Number(this.params()?.get('id'));
  return this.drinkService.getDrinkById(id);
});


  protected readonly soLy = signal(1);
  readonly drinks = input.required<DrinkModel>()
  protected giamSoLy(): void {
    if (this.soLy() === 1) {
      return;
    }
    this.soLy.update((soLy) => soLy - 1);
  }
  protected tangSoLy(): void {
    this.soLy.update((soLy) => soLy + 1);
  }
  protected readonly toppingCanDung = computed(() => {
    const congthuc = this.drinks();
    const soLy = this.soLy();
    return congthuc.topping.map((topping: Topping) => {
      return {
        ...topping,
        quantity: topping.quantity * soLy,
      };
    });
  });
  protected readonly tongTien = computed(() => {
    if (this.soLy() >= 5) {
      let tien = this.drinks().giaCoBan * 4 + this.drinks().giaCoBan * 0.9 * (this.soLy() - 4);
      return tien;
    }
    else {
      let tien = this.drinks().giaCoBan * this.soLy();
      return tien;
    }
  });
  protected readonly tongTopping = computed(() => {
    const total = this.toppingCanDung().reduce((tong, topping) => tong + topping.quantity, 0);
    return total;
  });

}

