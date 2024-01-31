import {Component, OnInit} from '@angular/core';
import {FoodService} from "../../../services/food.service";
import {Food} from "../../../Food";
import {ActivatedRoute, Router} from "@angular/router";
import {MessagesService} from "../../../services/messages.service";

@Component({
  selector: 'app-edit-food',
  templateUrl: './edit-food.component.html',
  styleUrl: './edit-food.component.css'
})
export class EditFoodComponent implements OnInit {
  food!: Food;
  btnText: string = 'Editar';

  constructor(private foodService: FoodService, private route: ActivatedRoute, private messagesService: MessagesService, private router: Router) {

  }

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get("id"))

    this.foodService.getThisFood(id).subscribe((item) => {
      this.food = item.data;
    })
  }

  async editHandler(foodData: Food) {
    const id = this.food.id;

    const formData = new FormData();

    formData.append('title', foodData.title);
    formData.append('description', foodData.description);

    if (foodData.image) {
      formData.append('image', foodData.image);
    }

    await this.foodService.updateFood(id!, formData).subscribe()

    this.messagesService.add("Prato atualizado e pronto para ser reapreciado!")

    this.router.navigate(['/'])


  }
}
