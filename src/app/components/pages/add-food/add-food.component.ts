import { Component } from '@angular/core';
import {Food} from "../../../Food";
import {FoodService} from "../../../services/food.service";
import {MessagesService} from "../../../services/messages.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-add-food',
  templateUrl: './add-food.component.html',
  styleUrl: './add-food.component.css'
})


export class AddFoodComponent {
  btnText = "Compartilhar"

  constructor(private foodService: FoodService, private messagesService: MessagesService, private router: Router){

  }

  async createHandler(food: Food){

    //vai tratar os dados que chegam do onSubmit

    const formData = new FormData();

    formData.append('title', food.title);
    formData.append('description', food.description);
    formData.append('image', food.image);

    await this.foodService.createFood(formData).subscribe(()=>{

      this.messagesService.add("Prato adicionado e pronto para ser apreciado!")

      this.router.navigate(['/']);

    });




  }

}
