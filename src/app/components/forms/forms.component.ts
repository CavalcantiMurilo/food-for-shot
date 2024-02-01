import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Food} from "../../Food";

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrl: './forms.component.css'
})
export class FormsComponent implements OnInit{
  @Output() onSubmit = new EventEmitter<Food>();
  @Input() btnText!: string;
  @Input() foodData: Food | null = null;

  forms!: FormGroup;


  ngOnInit(): void {
    this.forms = new FormGroup({
      id: new FormControl(this.foodData ? this.foodData.id : ''),
      title: new FormControl(this.foodData ? this.foodData.title : '', [Validators.required]),
      description: new FormControl(this.foodData ? this.foodData.description : '', [Validators.required]),
      image: new FormControl(this.foodData ? this.foodData.image : '',[Validators.required]),
    });
  }

  onFileSelected(event: any){
    const file: File = event.target.files[0];

    this.forms.get('image')?.setValue(file);



  }

  submit() {

    if (this.forms.invalid) {
      //Retorna ele mesmo e não envia os dados
      return;
    }

    this.onSubmit.emit(this.forms.value);
  }

  get title() {
    return this.forms.get('title')!;
  }

  get description() {
    return this.forms.get('description')!;
  }

  get image() {
    return this.forms.get('image')!;
  }

}
