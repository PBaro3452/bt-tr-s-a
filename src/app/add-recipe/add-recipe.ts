import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { DrinkService } from '../drink-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-recipe',
  imports: [ReactiveFormsModule],
  templateUrl: './add-recipe.html',
  styleUrl: './add-recipe.css',
})
export class AddDrink {

    private readonly fb = inject(FormBuilder);
  private readonly recipeService = inject(DrinkService);
  private readonly router = inject(Router);

  protected readonly drinkForm = this.fb.nonNullable.group({
  name: ['', Validators.required],
  description: ['', Validators.required],
  giaCoBan: ['', Validators.required],

});

  protected save(): void {
    if (this.drinkForm.invalid) {
      return;
    }

    const { name, description } = this.drinkForm.getRawValue();

    this.recipeService.addrink({
      id: this.nextId(),
      name,
      description,
      giaCoBan: 0,
      imgUrl: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600',
      isFavorite: false,
      topping: [],
      
    });

    this.router.navigate(['/recipes']);
  }

  private nextId(): number {
    const ids = this.recipeService.drinks().map((drink) => drink.id);
    return Math.max(...ids) + 1;
}
}
