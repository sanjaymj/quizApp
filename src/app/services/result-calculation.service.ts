import { Injectable } from '@angular/core';
import { DataHandlerServiceService } from './data-handler-service.service';
import { Question } from '../models/question.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { AnswerTypeContainer } from '../models/answer.type.model';
import { HttpClient } from '@angular/common/http';
import { GameState } from '../models/game.state.model';
import { environment } from 'src/environments/environment';
import { tap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
  })
  export class ResultCalculationService {
    private reviewedAnswers$$: BehaviorSubject<AnswerTypeContainer> = new BehaviorSubject<AnswerTypeContainer>(new AnswerTypeContainer(0, 0, 0));
    public reviewedAnswers$: Observable<AnswerTypeContainer> = this.reviewedAnswers$$.asObservable();

    private incorrectAnswers$$: BehaviorSubject<Question[]> = new BehaviorSubject<Question[]>([]);
    public incorrectAnswers$: Observable<Question[]> = this.incorrectAnswers$$.asObservable();

    constructor(private dataHandler: DataHandlerServiceService, private http: HttpClient) {
    }

    private resultsUrl = environment.questionsApi + '/results/';

    public review(index: String, category: String) {
        return this.http.get(this.resultsUrl +'index/'+index+'/category/'+category+'/').pipe(
          tap(val => {
            this.dataHandler.updateGameState(GameState.IDLE);
            this.reviewedAnswers$$.next(new AnswerTypeContainer(parseInt(val['correctAnswers']),
            parseInt(val['incorrectAnswers']), parseInt(val['unansweredQuestions'])));
          })
        ).toPromise();

    }
  }
