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

  forms!: FormGroup;

  ngOnInit(): void {
    this.forms = new FormGroup({
      id: new FormControl(''),
      title: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      image: new FormControl('', [Validators.required])
    });
  }

  submit() {

    if (this.forms.invalid) {
      //Retorna ele mesmo e não envia os dados
      return;
    }

    console.log(this.forms.value);

    this.onSubmit.emit(this.forms.value);
  }

  onFileSelected(event: any){
    const file: File = event.target.files[0];

    this.forms.patchValue({image: file});
  }

  // @ts-ignore
  get title() {
    return this.forms.get('title')!;
  }

  // @ts-ignore
  get description() {
    return this.forms.get('description')!;
  }

  // @ts-ignore
  get image(){
    return this.forms.get('image')!;
  }
}
