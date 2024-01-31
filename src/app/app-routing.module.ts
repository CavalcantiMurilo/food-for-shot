import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./components/pages/home/home.component";
import {SobreComponent} from "./components/pages/sobre/sobre.component";
import {AddFoodComponent} from "./components/pages/add-food/add-food.component";
import {FoodComponent} from "./components/pages/food/food.component";

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'sobre', component: SobreComponent},
  {path: 'foods/add', component: AddFoodComponent},
  {path: 'foods/:id', component: FoodComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
