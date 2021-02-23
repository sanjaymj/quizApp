import { Component, OnInit } from '@angular/core';
import { Question } from '../models/question.model';
import { GameState } from '../models/game.state.model';
import { DataHandlerServiceService } from '../services/data-handler-service.service';
import { ResultCalculationService } from '../services/result-calculation.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-quiz-home',
  templateUrl: './quiz.home.component.html',
  styleUrls: ['./quiz.home.component.css']
})
export class QuizHomeComponent implements OnInit {
  public currentQuestion: Question;
  public gameState = GameState;
  private category: String;
  private index: String;

  constructor(public dataHandler: DataHandlerServiceService,
              private result: ResultCalculationService,
              public router: Router,
              private route: ActivatedRoute) {
                this.route.queryParams.subscribe(params => {
                  this.dataHandler.getAllQuestionsbyCategories(params['category']);
              });
               }

  ngOnInit() {
    console.log("in quiz home");
    this.dataHandler.currentQuestion$.subscribe(val => {
    this.currentQuestion = val;
    });
  }

  public goToResultsPage() {
    this.result.review(this.index, this.category);
    this.router.navigate(['result']);
  }

  public finishTest() {
    this.dataHandler.updateDB().then(val => {
      this.category = val['category'];
      this.index = val['index'];
    })
    .catch(val => console.log(val));
  }

  public goToNextQuestion() {
    this.dataHandler.incrementIndex();
  }

  public goToPreviousQuestion() {
    this.dataHandler.decrementIndex();
  }
}
