import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from "@angular/router";
import {FormGroup, FormControl, Validators, FormGroupDirective} from "@angular/forms";

import {FoodService} from "../../../services/food.service";
import {Food} from "../../../Food";
import {MessagesService} from "../../../services/messages.service";
import {Comment} from "../../../Comment";
import {CommentService} from "../../../services/comment.service";

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

  commentForm!: FormGroup;

  constructor(private foodService: FoodService, private route: ActivatedRoute, private messagesService: MessagesService, private router: Router, private commentService: CommentService) {
  }

  ngOnInit(){
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.foodService.getThisFood(id).subscribe((item) => (this.food = item.data));

    this.commentForm = new FormGroup({
      text: new FormControl("", [Validators.required]),
      username: new FormControl("", [Validators.required]),
    })

  }

  get text(){
    return this.commentForm.get('text')!;
  }

  get username(){
    return this.commentForm.get('username')!;
  }

  async removeHandler(id:number){
    await this.foodService.removeFood(id).subscribe(()=>{

      this.messagesService.add("Prato excluído com sucesso!")

      this.router.navigate(['/']);

    });


  }

  async onSubmit(formDirective: FormGroupDirective){
    if (this.commentForm.invalid){
      return;
    }

    const data: Comment = this.commentForm.value;

    data.momentId = Number(this.food!.id);

    await this.commentService.createComment(data).subscribe((comment) => this.food!.comments!.push(comment.data));

    this.messagesService.add("Comentário adicionado!");

    this.commentForm.reset();

    formDirective.resetForm();


  }


  protected readonly Comment = Comment;
}
