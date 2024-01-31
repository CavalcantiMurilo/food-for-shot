import {Component, OnInit} from '@angular/core';
import {FoodService} from "../../../services/food.service";
import {Food} from "../../../Food";
import {environment} from "../../../../environments/environment";
import {faSearch} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{

  constructor(private foodService: FoodService) {
  }

  faSearch = faSearch;
  searchTerm: string = '';

  allFoods: Food[] = []; //para o banco
  foods: Food[] = [] //para ler dados na busca
  baseApiUrl =  environment.baseApiUrl;

  ngOnInit(): void{
    this.foodService.getFood().subscribe((items) => {

      const data = items.data

      data.map((item) => {
        item.created_at = new Date(item.created_at!).toLocaleDateString('pt-BR');
        item.updated_at = new Date(item.updated_at!).toLocaleDateString('pt-BR');
      })

      this.allFoods = data;
      this.foods = data
    })
  }

  search(e: Event){

    const target = e.target as HTMLInputElement;
    const value = target.value;

    this.foods = this.allFoods.filter((food) =>
      food.title.toLowerCase().includes(value)
    );
  }

}
