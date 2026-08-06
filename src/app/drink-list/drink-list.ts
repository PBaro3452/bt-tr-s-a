import { Component, computed, inject, signal } from '@angular/core';
import { DrinkModel } from '../models';
import { FormsModule } from '@angular/forms';
import { DrinkService } from '../drink-service';
import { RouterLink } from "@angular/router";
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatIcon } from "@angular/material/icon";
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-drink-list',
  imports: [FormsModule, RouterLink, MatFormFieldModule, MatInputModule, MatListModule, MatIcon, MatSelectModule],
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
  protected readonly kieuSapXep = signal<'none' | 'asc' | 'desc'>("none");

  // protected readonly ketquaHienThi = computed(()=>
  // {
  //   const DSach [ ... this.filterKW()];
  //   const kieu = this.kieuSapXep();
  //   if()
  // })

  protected chonMon(nuocUong: DrinkModel): void {
    this.selectedDrink.set(nuocUong);
  }

  protected readonly giaCaoNhat = computed(() => {
    const maxPrice = Math.max(...this.nuocUong().map((drink) => drink.giaCoBan));
    return maxPrice;
  });
}