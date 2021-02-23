import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-quiz',
  templateUrl: './create-quiz.component.html',
  styleUrls: ['./create-quiz.component.css']
})
export class CreateQuizComponent implements OnInit {
  public quizNameForm: FormGroup;
  public showQuestionnaire: boolean = false;
  public quizName: string;
  public questionNumber: number = 0;

  constructor(private router: Router) {
    this.quizNameForm = new FormGroup({
      name: new FormControl('', [Validators.required])
    });
  }

  ngOnInit() {
  }

  onSubmit() {
    this.quizName = this.quizNameForm.controls['name'].value;
    this.showQuestionnaire = true;
  }

}
