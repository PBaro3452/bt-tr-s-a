import { Component, inject,signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { DrinkService } from '../drink-service';
import { Router, RouterLink } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { form,FormField,required, email, minLength, max, min, submit } from '@angular/forms/signals';
import { DrinkModel } from '../models';


@Component({
  selector: 'app-add-recipe',
  imports: [ReactiveFormsModule, MatFormFieldModule,MatIconModule,FormField, MatInputModule, MatButtonModule,RouterLink],
  templateUrl: './add-recipe.html',
  styleUrl: './add-recipe.css',
})
export class AddDrink {
  private readonly recipeService = inject(DrinkService);
  private readonly router = inject(Router);

  protected readonly drinkModel = signal({
    name: '',
    description: '',
    authorEmail: '',
    giaCoBan: 0,
  });

    protected readonly recipeForm = form(this.drinkModel, (path) => {
    required(path.name, { message: 'Tên món không được để trống' });
    minLength(path.name, 3,{ message: 'Tên món phải ít nhất 3 kí tự'});

    required(path.description, { message: 'Mô tả không được để trống' });

    required(path.authorEmail, { message: 'Email tác giả không được để trống' });
    email(path.authorEmail, { message: 'Email phải đúng định dạng không dấu' });
    
    required(path.giaCoBan, { message: 'Giá cơ bản không được để trống' });
    min(path.giaCoBan, 1000, { message:'Giá bắt buộc tối thiểu là 1000'});
    max(path.giaCoBan, 200000, { message:'Giá tối đa là 200000'});

  });
  protected readonly drinkForm=form(this.drinkModel);

  protected async save(event: Event): Promise<void> {
    event.preventDefault();

    const ok = await submit(this.recipeForm,async()=> { 
    
    // 1. Lấy đủ giaCoBan từ form
    const { name, description, giaCoBan,authorEmail } = this.drinkModel();

    const newDrink: DrinkModel={
      id: this.nextId(),
      name,
      description,
      giaCoBan: Number(giaCoBan),
      authorEmail,
      imgUrl: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600',
      isFavorite: false,
      topping: [],
    };
    this.recipeService.addrink(newDrink)
  
  });
  if(ok){
    this.recipeForm().reset;
    this.drinkModel.set({name: '', description: '', authorEmail: '', giaCoBan:0})
  this.router.navigate(['/drinks']);
  }
   
    
  
};

  private nextId(): number {
    const ids = this.recipeService.drinks().map((drink) => drink.id);
    // 2. Tránh lỗi -Infinity khi danh sách rỗng
    return ids.length > 0 ? Math.max(...ids) + 1 : 1;
  }
}