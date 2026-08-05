import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDrink } from './add-recipe';

describe('AddRecipe', () => {
  let component: AddDrink;
  let fixture: ComponentFixture<AddDrink>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddDrink],
    }).compileComponents();

    fixture = TestBed.createComponent(AddDrink);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
