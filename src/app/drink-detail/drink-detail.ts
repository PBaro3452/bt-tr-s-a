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

  // Input không bắt buộc bắt buộc nữa để tránh crash khi dùng qua Routing
  readonly drinks = input<DrinkModel>();

  // Lấy món ăn từ Route Params
  protected readonly selectedDrinkFromParams = computed(() => {
    const id = Number(this.params()?.get('id'));
    return id ? this.drinkService.getDrinkById(id) : undefined;
  });

  // Hợp nhất dữ liệu: Lấy từ Route Param trước, nếu không có mới dùng Input
  protected readonly currentDrink = computed(() => {
    return this.selectedDrinkFromParams() ?? this.drinks();
  });

  protected readonly soLy = signal(1);

  protected giamSoLy(): void {
    if (this.soLy() <= 1) return;
    this.soLy.update((soLy) => soLy - 1);
  }

  protected tangSoLy(): void {
    this.soLy.update((soLy) => soLy + 1);
  }

protected readonly toppingCanDung = computed(() => {
  const drink = this.selectedDrinkFromParams();
  if (!drink || !drink.topping) return [];

  const soLy = this.soLy();
  return drink.topping.map((topping: Topping) => ({
    ...topping,
    quantity: topping.quantity * soLy,
  }));
});

  // Tính Tổng tiền an toàn
  protected readonly tongTien = computed(() => {
    const congthuc = this.currentDrink();
    if (!congthuc) return 0;

    const gia = congthuc.giaCoBan;
    const soLy = this.soLy();

    if (soLy >= 5) {
      return gia * 4 + gia * 0.9 * (soLy - 4);
    }
    return gia * soLy;
  });

  // Tính Tổng Topping
  protected readonly tongTopping = computed(() => {
    return this.toppingCanDung().reduce((tong, topping) => tong + topping.quantity, 0);
  });
}