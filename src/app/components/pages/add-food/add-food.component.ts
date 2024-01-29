import { Component } from '@angular/core';
import {Food} from "../../../Food";

import {FoodService} from "../../../services/food.service";

@Component({
  selector: 'app-add-food',
  templateUrl: './add-food.component.html',
  styleUrl: './add-food.component.css'
})

export class AddFoodComponent {
  btnText = "Compartilhar"

  constructor(private foodService: FoodService){

  }

  async createHandler(food: Food){

    //vai tratar os dados que chegam do onSubmit

    const formData = new FormData();

    formData.append('title', food.title);
    formData.append('description', food.description);
    formData.append('image', food.image);

    await this.foodService.createFood(formData).subscribe();
  }

}
