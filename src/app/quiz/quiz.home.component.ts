import { Component, OnInit } from '@angular/core';
import { Question } from '../models/question.model';
import { GameState } from '../models/game.state.model';
import { DataHandlerServiceService } from '../services/data-handler-service.service';
import { ResultCalculationService } from '../services/result-calculation.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { AlertBoxComponent } from '../widgets/alert-box/alert-box.component';
import { finalize, take } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';
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
  private isLoading$$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  public isLoading$: Observable<boolean> =this.isLoading$$.asObservable();

  constructor(public dataHandler: DataHandlerServiceService,
              private result: ResultCalculationService,
              public router: Router,
              private route: ActivatedRoute,
              public dialog: MatDialog) {
                this.route.queryParams.subscribe(params => {
                  this.dataHandler.getAllQuestionsbyCategories(params['category']);
              });
               }

  ngOnInit() {
    this.dataHandler.currentQuestion$.subscribe(val => this.currentQuestion = val);
  }

  public goToResultsPage() {
      this.isLoading$$.next(true);
      this.result.review(this.index, this.category).then(val => this.isLoading$$.next(false));
      this.router.navigate(['result']);
  }

  public finishTest() {
    const dialogRef = this.dialog.open(AlertBoxComponent, {
      width: '250px',
    });
    dialogRef.componentInstance.textContent = "Are you sure, you want to submit ?";

    dialogRef.componentInstance.completion.pipe(take(1), finalize(() => dialogRef.close())).subscribe(val => {
      if (val) {
        this.isLoading$$.next(true);
        this.dataHandler.updateDB().then(val => {
          this.category = val['category'];
          this.index = val['index'];
          this.isLoading$$.next(false);
        })
        .catch(val => console.log(val));
      }
    })

  }

  public goToNextQuestion() {
    this.dataHandler.incrementIndex();
  }

  public goToPreviousQuestion() {
    this.dataHandler.decrementIndex();
  }
}
