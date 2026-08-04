import { Component, computed, inject, signal } from '@angular/core';
import { DrinkModel } from '../models';
import { FormsModule } from '@angular/forms';
import { DrinkService } from '../drink-service';
import { RouterLink } from "@angular/router";


@Component({
  selector: 'app-drink-list',
  imports: [FormsModule, RouterLink],
  templateUrl: './drink-list.html',
  styleUrl: './drink-list.css',
})
export class DrinkList {
  private readonly drinkService = inject(DrinkService);
  protected readonly selectedDrink = signal<DrinkModel>(this.drinkService.drinks()[0]);

  protected readonly keyword = signal('');
  protected readonly nuocUong = this.drinkService.drinks;
  protected readonly filterKW = computed(()=>
  {
    const key = this.keyword().toLocaleLowerCase().trim();
    const all = this.nuocUong();
    if(key ==='')
    {
      return all;
    }
    return all.filter((nuocUong)=>
      nuocUong.name.toLocaleLowerCase().includes(key));
  });


  protected chonMon(nuocUong: DrinkModel): void {
    this.selectedDrink.set(nuocUong);
  }

  protected readonly giaCaoNhat = computed(() => {
    const maxPrice = Math.max(...this.nuocUong().map((drink) => drink.giaCoBan));
    return maxPrice;
  });
}