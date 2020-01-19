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
  public currentQuestion: Question;
  public gameState = GameState;
  constructor(public dataHandler: DataHandlerServiceService,
              private result: ResultCalculationService,
              public router: Router) { }

  ngOnInit() {
    this.dataHandler.currentQuestion$.subscribe(val => {
      this.currentQuestion = val;
    });
  }

  public goToResultsPage() {
    this.result.review();
    this.router.navigate(['result']);
  }

  public finishTest() {
    this.dataHandler.updateDB();
  }

  public goToNextQuestion() {
    this.dataHandler.incrementIndex();
  }

  public goToPreviousQuestion() {
    this.dataHandler.decrementIndex();
  }
}
