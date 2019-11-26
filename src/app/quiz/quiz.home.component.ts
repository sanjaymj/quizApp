import { Component, OnInit } from '@angular/core';
import { Question } from '../models/question.model';
import { GameState } from '../models/game.state.model';
import { DataHandlerServiceService } from '../services/data-handler-service.service';
import { ResultCalculationService } from '../services/result-calculation.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-quiz-home',
  templateUrl: './quiz.home.component.html',
  styleUrls: ['./quiz.home.component.css']
})
export class QuizHomeComponent implements OnInit {

  //public questions: Question[];
  public currentQuestion: Question;
  public gameState = GameState;
  constructor(public dataHandler: DataHandlerServiceService,
              private result: ResultCalculationService,
              public router: Router) { }

  ngOnInit() {
   /*  this.dataHandler.question$.subscribe(val => {
      console.log(val);
      this.questions = val;
    }); */
    this.dataHandler.currentQuestion$.subscribe(val => {
      console.log('current question changed');
      this.currentQuestion = val;
      console.log('init home ', val);
    });
  }

  public review() {
    
  }

  goTo() {
    this.result.review1();
    this.router.navigate(['result']);
  }

  updateDB() {
    this.dataHandler.updateDB();
  }
}
