import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DataHandlerServiceService } from 'src/app/services/data-handler-service.service';
import { AlertBoxComponent } from 'src/app/widgets/alert-box/alert-box.component';
import {take, finalize} from 'rxjs/operators';
interface QuestionDTO {
  problemStatement: string;
  options: string[];
  correctAnswer: string;
  questionCategory: string;
  explanation: string;
};

@Component({
  selector: 'app-add-questions',
  templateUrl: './add-questions.component.html',
  styleUrls: ['./add-questions.component.css']
})
export class AddQuestionsComponent implements OnInit {
  createQuizForm: FormGroup;
  @Input()
  public quizName: string;
  public questionNumber: number = 0;
  private questions: QuestionDTO[] = [];
  private currentQuestion: QuestionDTO;
  constructor(private router: Router, public dataHandler: DataHandlerServiceService, public dialog: MatDialog) {

    this.createQuizForm = new FormGroup({
      question: new FormControl('', [Validators.required]),
      option1: new FormControl('', [Validators.required]),
      option2: new FormControl('', [Validators.required]),
      option3: new FormControl('', [Validators.required]),
      option4: new FormControl('', [Validators.required]),
      correctAnswer: new FormControl('', [Validators.required])
    });
  }

  ngOnInit() {
    console.log(this.quizName);
  }

  onSubmit() {
    const dialogRef = this.dialog.open(AlertBoxComponent, {
      width: '250px',
    });
    dialogRef.componentInstance.textContent = "Are you sure, you want to submit ?";

    dialogRef.componentInstance.completion.pipe(take(1), finalize(() => dialogRef.close())).subscribe(val => {
      if (val) {
        this.addCurrentQuestionToCollection();
        this.dataHandler.createNewQuiz(this.questions);
      }
    })
    /*this.addCurrentQuestionToCollection();
    console.log(this.questions);
    this.dataHandler.createNewQuiz(this.questions);*/
  }

  onNext() {
    this.addCurrentQuestionToCollection();
    this.questionNumber++;
    this.createQuizForm.reset();
  }

  private addCurrentQuestionToCollection(): void {
    this.currentQuestion = {
      problemStatement: this.createQuizForm.controls['question'].value,
      options: [this.createQuizForm.controls['option1'].value,
         this.createQuizForm.controls['option2'].value,
         this.createQuizForm.controls['option3'].value,
         this.createQuizForm.controls['option4'].value],
      correctAnswer: this.createQuizForm.controls['correctAnswer'].value,
      questionCategory: this.quizName,
      explanation: "no explanation"
    };

    this.questions.push(this.currentQuestion);

  }

}


