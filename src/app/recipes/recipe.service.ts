
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Ingredient } from "../shared/ingredients.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Recipe } from "./recipe.model";


@Injectable()
export class RecipeService {

    recipesChanged = new Subject<Recipe[]>();

    // recipeSelected = new Subject<Recipe>();

    // private recipes: Recipe[] = [
    //     new Recipe('Pizza', 
    //     'Fina pica s okusom pizze', 
    //     'https://ichef.bbci.co.uk/food/ic/food_16x9_1600/recipes/mac_n_cheese_70611_16x9.jpg', 
    //     [
    //         new Ingredient('Meat', 1),
    //         new Ingredient('Sir', 5)
    //     ]),
    //     new Recipe('Kajgana',
    //     'Tako fina kajgana da ce ti kuci doci Gana',
    //      'https://ichef.bbci.co.uk/food/ic/food_16x9_1600/recipes/mac_n_cheese_70611_16x9.jpg', 
    //      [new Ingredient('Jaja', 4)])
    //   ];
    private recipes: Recipe[] = []

      constructor(private slService: ShoppingListService) {}

      setRecipes(recipes: Recipe[]) {
          this.recipes = recipes;
          this.recipesChanged.next(this.recipes.slice())
      }
    
      getRecipes() {
        return this.recipes.slice()
    }

    getRecipe(index: number) {
        return this.recipes[index];
    }

    addIngredientsToShoppingList(ingredients: Ingredient[]) {
        this.slService.addIngredients(ingredients)
    }

    addRecipe(recipe: Recipe) {
        this.recipes.push(recipe);
        this.recipesChanged.next(this.recipes.slice())
    }

    updateRecipe(index: number, newRecipe: Recipe) {
        this.recipes[index] = newRecipe;
        this.recipesChanged.next(this.recipes.slice())

    }

    deleteRecipe(index: number) {
        this.recipes.splice(index, 1);
        this.recipesChanged.next(this.recipes.slice())
    }


}