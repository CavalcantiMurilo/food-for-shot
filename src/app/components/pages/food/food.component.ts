import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from "@angular/router";
import {FoodService} from "../../../services/food.service";
import {Food} from "../../../Food";
import {environment} from "../../../../environments/environment";
import {faTimes, faEdit} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-food',
  templateUrl: './food.component.html',
  styleUrl: './food.component.css'
})
export class FoodComponent implements OnInit{
  food?: Food;

  baseApiUrl = environment.baseApiUrl;

  faTimes = faTimes;
  faEdit = faEdit

  constructor(private foodService: FoodService, private route: ActivatedRoute) {
  }

  ngOnInit(){
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.foodService.getThisFood(id).subscribe(item => this.food = item.data)
  }


}
